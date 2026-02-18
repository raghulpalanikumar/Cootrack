# Switch to standard image that includes build tools
FROM python:3.11

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install pip dependencies directly
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir --default-timeout=100 -r requirements.txt

COPY . .

# Copy entrypoint.sh and make it executable (if used)
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# Provide a default command (can be overridden by docker-compose)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
