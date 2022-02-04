from django.db import models
from items.models import Item

# Create your models here.
class Images(models.Model):

    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, relalted_name='seller-id' )
    img_url = models.CharField(max_length=500)

    def __str__(self):
        return f'Image for listing {self.item} with image url {self.img_url}'
