from rest_framework import serializers
from .models import Images

class ImagesSerializer(serializers.ModelSerializer):
    item_id = serializers.ReadOnlyField(source='item.id')
    
    class Meta:
<<<<<<< HEAD
        model =  Images
        fields = ('id', 'item', 'img_url')
=======
        model = Images
        fields = ('id', 'item_id', 'img_url')
>>>>>>> 780d3a7010f206994addabd7a9f42ea80c056278
