from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='get-all'),
    path("get_by_item/", views.get_by_item, name='get-by-item'),
    path("add/", views.add, name='add'),
    path("delete/", views.delete, name='delete')
    
]