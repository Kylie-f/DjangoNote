from django.views.generic import TemplateView, CreateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from accounts.forms import NoteCreationForm
from accounts.models import Note as N, CustomUser
from django.urls import reverse_lazy
from .models import Note
from django.shortcuts import render

def notes_list(request):
    notes = N.objects.all()
    return render(request, 'notes.html', {'notes': notes})

class NoteCreationView(LoginRequiredMixin, CreateView):
    model = N
    form_class = NoteCreationForm
    template_name = "add_note.html"
    success_url = reverse_lazy("notes")
    def form_valid(self, form):
        # Automatically set the 'owner' field to the current logged-in user
        form.instance.owner = self.request.user
        return super().form_valid(form)

