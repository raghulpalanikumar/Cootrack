from django.contrib import admin
from .models import Ticket

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'priority', 'category', 'created_at')
    list_filter = ('status', 'priority', 'category')
    search_fields = ('title', 'description')
