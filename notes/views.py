from django.views.generic import TemplateView
from .models import Note
from django.shortcuts import render

def notes_list(request):
    notes = Note.objects.all()
    return render(request, 'notes.html', {'notes': notes})