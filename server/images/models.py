from django.db import models
from items.models import Item
from cloudinary.models import CloudinaryField

# Create your models here.
class Images(models.Model):
<<<<<<< HEAD

    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, related_name='seller_id' )
    img_url = models.CharField(max_length=500)
=======
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, related_name='item')
    img_url = CloudinaryField('image', blank=True, null=True)
>>>>>>> 780d3a7010f206994addabd7a9f42ea80c056278

    def __str__(self):
        return f'Image for listing {self.item} with images url {self.img_url}'
