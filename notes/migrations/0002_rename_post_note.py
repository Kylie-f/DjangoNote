# Generated by Django 5.0.9 on 2024-11-19 01:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Post',
            new_name='Note',
        ),
    ]
