from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='get-all'),
<<<<<<< HEAD
    path("get_by_item/<int:item_id>", views.get_by_item, name='get-by-item'),
    path("add/<int:item_id>", views.add, name='add'),
=======
    path("get_by_item/<int:item_id>/", views.get_by_item, name='get-by-item'),
    path("add/<int:item_id>/", views.add, name='add'),
>>>>>>> 780d3a7010f206994addabd7a9f42ea80c056278
    path("delete/", views.delete, name='delete')
]