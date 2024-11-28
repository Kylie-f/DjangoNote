from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)
    collaborators  = models.ManyToManyField('self', blank=True)

class Note(models.Model):
    owner = models.ForeignKey('CustomUser', on_delete=models.SET_NULL,null=True, blank=False, related_name='note_owned')
    access = models.ManyToManyField('CustomUser', blank=True, related_name='notes_accessible')
    type = models.CharField(max_length=10, choices=[('image', 'Image'), ('file', 'File'), ('text', 'Text')], null=False, blank=False)
    title = models.CharField(max_length=120, null=False, blank=False)
    image = models.ImageField(upload_to='notes/images/', blank=True)
    file = models.FileField(upload_to='notes/files/', blank=True)
    text = models.TextField(blank=True)  # Text field for 'text' type notes

    def clean(self):
        """Custom validation to ensure either 'image', 'file', or 'text' is set based on the 'type' field."""
        if self.type not in ['image', 'file', 'text']:
            raise ValidationError("The 'type' field must be one of 'image', 'file', or 'text'.")

        # Image validation
        if self.type == 'image':
            if not self.image:
                raise ValidationError('An image must be provided when the note type is "image".')
            if self.file:
                raise ValidationError('You cannot specify both an image and a file when the note type is "image".')

        # File validation
        elif self.type == 'file':
            if not self.file:
                raise ValidationError('A file must be provided when the note type is "file".')
            if self.image:
                raise ValidationError('You cannot specify both an image and a file when the note type is "file".')

        # Text validation
        elif self.type == 'text':
            if not self.text:
                raise ValidationError('Text content must be provided when the note type is "text".')
            if self.image or self.file:
                raise ValidationError('You cannot specify both an image or a file when the note type is "text".')

    def save(self, *args, **kwargs):
        # Always call clean before saving
        self.clean()
        super(Note, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
