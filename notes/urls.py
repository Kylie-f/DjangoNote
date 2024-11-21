from django.urls import path
#from .views import HomePageView
from .views import notes_list

urlpatterns = [
    path("", notes_list, name="notes"),
    #path("notes/", ) *****
]