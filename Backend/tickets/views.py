import os
import json
import logging
import requests
from django.db.models import Count, Avg
from django.db.models.functions import TruncDay
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Ticket
from .serializers import TicketSerializer

logger = logging.getLogger(__name__)

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        priority = self.request.query_params.get('priority')
        status_param = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category=category)
        if priority:
            queryset = queryset.filter(priority=priority)
        if status_param:
            queryset = queryset.filter(status=status_param)
        if search:
            from django.db.models import Q
            queryset = queryset.filter(Q(title__icontains=search) | Q(description__icontains=search))
        
        return queryset

class StatsView(APIView):
    def get(self, request):
        total_tickets = Ticket.objects.count()
        open_tickets = Ticket.objects.filter(status='open').count()
        
        # Calculate average tickets per day
        # Group by day, count items, then average those counts.
        # Note: If no tickets exist, aggregate returns None for Avg usually.
        daily_counts = Ticket.objects.annotate(day=TruncDay('created_at')).values('day').annotate(daily_count=Count('id')).aggregate(avg=Avg('daily_count'))
        avg_desc = daily_counts.get('avg')
        avg_tickets_per_day = avg_desc if avg_desc is not None else 0.0
        
        # Priority breakdown
        priority_data = Ticket.objects.values('priority').annotate(count=Count('id'))
        priority_breakdown = {item['priority']: item['count'] for item in priority_data}
        # Ensure all keys exist
        for p in ['low', 'medium', 'high', 'critical']:
            if p not in priority_breakdown:
                priority_breakdown[p] = 0

        # Category breakdown
        category_data = Ticket.objects.values('category').annotate(count=Count('id'))
        category_breakdown = {item['category']: item['count'] for item in category_data}
        for c in ['billing', 'technical', 'account', 'general']:
            if c not in category_breakdown:
                category_breakdown[c] = 0
        
        return Response({
            "total_tickets": total_tickets,
            "open_tickets": open_tickets,
            "avg_tickets_per_day": round(avg_tickets_per_day, 1),
            "priority_breakdown": priority_breakdown,
            "category_breakdown": category_breakdown
        })

class ClassifyView(APIView):
    def post(self, request):
        description = request.data.get('description', '')
        if not description:
            return Response({"error": "Description is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        gemini_key = os.environ.get('GEMINI_API_KEY')
        openai_key = os.environ.get('OPENAI_API_KEY')

        # Default fallback
        suggested_category = "general"
        suggested_priority = "low"
        
        try:
            if gemini_key:
                import google.generativeai as genai
                genai.configure(api_key=gemini_key)
                model = genai.GenerativeModel('gemini-pro')
                prompt = f"""
                Analyze the following support ticket description and suggest a category (billing, technical, account, general) and a priority (low, medium, high, critical).
                Return ONLY a valid JSON object with keys "category" and "priority".
                Description: "{description}"
                """
                response = model.generate_content(prompt)
                text = response.text
                if "```json" in text:
                    text = text.split("```json")[1].split("```")[0]
                elif "```" in text:
                    text = text.split("```")[1].split("```")[0]
                
                data = json.loads(text.strip())
                suggested_category = str(data.get('category', 'general')).lower()
                suggested_priority = str(data.get('priority', 'low')).lower()

            elif openai_key:
                headers = {
                    "Authorization": f"Bearer {openai_key}",
                    "Content-Type": "application/json"
                }
                # Use GPT-3.5 or 4
                prompt = f"""
                Analyze the following support ticket description and suggest a category (billing, technical, account, general) and a priority (low, medium, high, critical).
                Return ONLY a valid JSON object with keys "category" and "priority".
                Description: "{description}"
                """
                payload = {
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.3
                }
                response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload, timeout=10)
                if response.status_code == 200:
                    content = response.json()['choices'][0]['message']['content']
                    # Cleanup markdown code blocks if any
                    if "```json" in content:
                        content = content.split("```json")[1].split("```")[0]
                    elif "```" in content:
                        content = content.split("```")[1].split("```")[0]
                    
                    data = json.loads(content.strip())
                    suggested_category = str(data.get('category', 'general')).lower()
                    suggested_priority = str(data.get('priority', 'low')).lower()
                else:
                    logger.error(f"OpenAI Error: {response.text}")
        except Exception as e:
            logger.error(f"LLM Error: {e}")
            pass

        # Validate against choices
        valid_categories = [c[0] for c in Ticket.CATEGORY_CHOICES]
        valid_priorities = [c[0] for c in Ticket.PRIORITY_CHOICES]

        if suggested_category not in valid_categories:
            suggested_category = 'general'
        
        if suggested_priority not in valid_priorities:
            suggested_priority = 'low'

        return Response({
            "suggested_category": suggested_category,
            "suggested_priority": suggested_priority
        })
