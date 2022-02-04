from rest_framework import serializers
from server.items.models import Item
from .models import Images

class ImagesSerializer(serializers.ModelSerializer):
    item = serializers.ReadOnlyField(source='item.id')

    class Meta:
        model =  Item
        fields = ('id', 'item', 'img_url')