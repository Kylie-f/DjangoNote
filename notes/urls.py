from django.urls import path
#from .views import HomePageView
from .views import notes_list, NoteCreationView

urlpatterns = [
    path("", notes_list, name="notes"),
    #path("notes/", ) *****
    path("add_note/", NoteCreationView.as_view(), name="add-note"),
]