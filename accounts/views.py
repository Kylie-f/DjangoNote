from django.urls import reverse_lazy
from django.views.generic import CreateView

from .forms import CustomUserCreationForm

class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"
    
    def form_valid(self, form):
        # Print any form validation issues
        print("Form is valid")
        return super().form_valid(form)

    def form_invalid(self, form):
        # Print errors if the form is invalid
        print("Form errors:", form.errors)
        return super().form_invalid(form)