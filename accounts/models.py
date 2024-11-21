from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)
    collaborators = models.ManyToManyField('self', blank=True)

class Note(models.Model):
    IMAGE = 'image'
    FILE = 'file'
    TEXT = 'text'
    NOTE_TYPE_CHOICES = [
        (IMAGE, 'Image'),
        (FILE, 'File'),
        (TEXT, 'Text'),
    ]
    note_owner = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=False, blank=False, related_name='notes_owned')
    note_access = models.ManyToManyField('CustomUser', blank=True, related_name='notes_accessed')
    type = models.CharField(max_length=5, choices=NOTE_TYPE_CHOICES, default=TEXT)  # True for image, False for file
    title = models.CharField(max_length=120, null=False, blank=False)
    image = models.ImageField(upload_to='notes/images/', blank=True)
    file = models.FileField(upload_to='notes/files/', blank=True)
    text = models.TextField(max_length=500, blank=True)

    def clean(self):
        """Custom validation to ensure either 'image', 'file', or 'text' is set based on the 'type' field."""
        # Check that the type is one of the three valid choices (this is automatically done by the choices argument)
        if self.type not in [self.IMAGE, self.FILE, self.TEXT]:
            raise ValidationError('Invalid type selected. It must be one of: image, file, or text.')

        # Ensure that the correct fields are filled based on the 'type' field.
        if self.type == self.IMAGE:
            if not self.image:
                raise ValidationError('An image must be provided when type is Image.')
            if self.file or self.text:
                raise ValidationError('You cannot specify both an image and a file or text.')

        elif self.type == self.FILE:
            if not self.file:
                raise ValidationError('A file must be provided when type is File.')
            if self.image or self.text:
                raise ValidationError('You cannot specify both a file and an image or text.')

        elif self.type == self.TEXT:
            if not self.text:
                raise ValidationError('Text must be provided when type is Text.')
            if self.image or self.file:
                raise ValidationError('You cannot specify both text and an image or file.')

    def save(self, *args, **kwargs):
        # Always call clean before saving
        self.clean()
        super(Note, self).save(*args, **kwargs)

    def __str__(self):
        return self.title