from django.db import models
from ..users.models import User

# Create your models here.
class Item(models.Model):

    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='seller_id')
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='buyer_id', default=None, blank=True)
    
    id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_lenght=200)
    #price = models.PositiveIntegerField()
    #charity = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    img_url = models.CharField()
    is_claimed = models.BooleanField(default=False)
    time = models.DateField(auto_now=True)
    address = models.CharField(max_length = 100)

    def __str__(self):
        return f'Listing name:{self.name}, desc: {self.description}, selller:{self.seller_id}'



