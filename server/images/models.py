from django.db import models
from items.models import Item
from cloudinary.models import CloudinaryField

# Create your models here.
class Images(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
    img_url = CloudinaryField('image', blank=True, null=True)

    def __str__(self):
        return f'Image for listing {self.item} with images url {self.img_url}'
