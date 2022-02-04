from rest_framework import serializers
from .models import Item


class ItemSerialzer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')
    buyer = serializers.ReadOnlyField(source='buyer.username')

    class Meta:
        model = Item
        fields = ('id','name','price','charity', 'category','description','img_url', 'is_claimed','time', 'address')

