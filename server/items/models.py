from django.db import models
from ..users.models import Users

# Create your models here.
class Item(models.Model):
    
    item_id = models.PositiveIntegerField()
    uuid = models.ForeignKey(Users, null=True, on_delete=models.SET_NULL)
        
    name = models.CharField(max_lenght=200)
    price = models.PositiveIntegerField()
    charity = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    img_url = models.CharField()
    is_clamed = models.BooleanField()
    time = models.DateTimeField()



