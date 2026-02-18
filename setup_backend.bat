@echo off
cd Backend
venv\Scripts\pip install -r requirements.txt
venv\Scripts\django-admin startproject config .
venv\Scripts\python manage.py startapp tickets
