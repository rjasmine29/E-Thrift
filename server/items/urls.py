from django.urls import path
from . import views

urlpatterns = [
<<<<<<< HEAD
    path('', views.index, name='item-index'),
    path("all/", views.get_all_items, name='get-all'),
=======
    path('', views.get_all_items, name='item-index'),
>>>>>>> b1d2586ade328f31bc26ee39bd1ea85c6729d117
    path("get_by_id/<int:item_id>", views.get_by_item_id, name="get_by_id"),
    path("get_by_username/<str:username>", views.get_by_username, name="get_by_username"),
    path("create", views.create, name="create"),
    path("update", views.update_listing, name="update"),
    path("delete", views.delete, name="delete"),
    path("claim/<int:item_id>", views.claim_item, name="claim_item")
]