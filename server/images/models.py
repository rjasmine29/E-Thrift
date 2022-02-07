from django.db import models
from items.models import Item
from cloudinary.models import CloudinaryField

# Create your models here.
class Images(models.Model):
    img_url = models.CharField(max_length=500)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    img_url = CloudinaryField('image', blank=True, null=True)

    def __str__(self):
        return f'Image for listing {self.item} with images url {self.img_url}'
