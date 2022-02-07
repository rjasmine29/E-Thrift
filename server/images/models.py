from django.db import models
from items.models import Item
from cloudinary.models import CloudinaryField

# Create your models here.
class Images(models.Model):
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, related_name='seller_id' )
    img_url = models.CharField(max_length=500)
=======
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, related_name='item')
=======
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
>>>>>>> 414fb03590213f167ba70d0408956e00d09b599a
=======
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
>>>>>>> 5773b67a81a52a621c565cf22c60a4668b6e01f1
    img_url = CloudinaryField('image', blank=True, null=True)
>>>>>>> 780d3a7010f206994addabd7a9f42ea80c056278

    def __str__(self):
        return f'Image for listing {self.item} with images url {self.img_url}'
