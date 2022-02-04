from django.db import models
from items.models import Item
from cloudinary.models import CloudinaryField

# Create your models here.
class Images(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, related_name='item')
    img_url = CloudinaryField('img_url', blank=True, null=True)

    def __str__(self):
        return f'Image for listing {self.item} with image url {self.img_url}'
