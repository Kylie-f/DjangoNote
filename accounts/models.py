from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)
    collaborators  = models.ManyToManyField('self', on_delete=models.SET_NULL, null=True, blank=True)

class Note(models.Model):
    owner = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=False, blank=False)
    access = models.ManyToManyField('CustomUser', blank=True)
    type = models.BooleanField(null=False, blank=False)  # True for image, False for file
    title = models.CharField(max_length=120, null=False, blank=False)
    image = models.ImageField(upload_to='notes/images/', blank=True, null=True)
    file = models.FileField(upload_to='notes/files/', blank=True, null=True)

    def clean(self):
        """Custom validation to ensure either 'image' or 'file' is set based on the 'type' field."""
        # If type is True (image), the file field should not be used
        if self.type and not self.image:
            raise ValidationError('An image must be provided when type is True.')
        # If type is False (file), the image field should not be used
        if not self.type and not self.file:
            raise ValidationError('A file must be provided.')
        if self.type and self.file:
            raise ValidationError('You cannot specify both an image and a file')
        if not self.type and self.image:
            raise ValidationError('You cannot specify both an image and a file')

    def save(self, *args, **kwargs):
        # Always call clean before saving
        self.clean()
        super(Note, self).save(*args, **kwargs)

    def __str__(self):
        return self.title