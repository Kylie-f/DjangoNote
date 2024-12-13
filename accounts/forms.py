from django.contrib.auth.forms import UserCreationForm
from django.forms import ModelForm
from .models import CustomUser, Note 

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ("username","name","email")

class NoteCreationForm(ModelForm):
    class Meta:
        model = Note
        fields = ['type', 'title', 'image', 'file', 'text']

    def __init__(self, *args, **kwargs):
        super(NoteCreationForm, self).__init__(*args, **kwargs)
        # Dynamically disable the fields based on the note type
        if self.instance and self.instance.type:
            self.set_type_specific_fields(self.instance.type)

    def set_type_specific_fields(self, note_type):
        """Disable or hide the irrelevant fields based on the note type."""
        if note_type == 'image':
            self.fields['file'].widget.attrs['disabled'] = True
            self.fields['text'].widget.attrs['disabled'] = True
        elif note_type == 'file':
            self.fields['image'].widget.attrs['disabled'] = True
            self.fields['text'].widget.attrs['disabled'] = True
        elif note_type == 'text':
            self.fields['image'].widget.attrs['disabled'] = True
            self.fields['file'].widget.attrs['disabled'] = True