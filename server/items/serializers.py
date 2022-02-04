from rest_framework import serializers
from .models import Item


class ItemSerialzer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')
    buyer = serializers.ReadOnlyField(source='buyer.username')

    class Meta:
        model = Item
<<<<<<< HEAD
        fields = ('id','name','category','description','is_claimed','time', 'address')
=======
        fields = ('id', 'name','category','description','is_claimed','time', 'address', 'seller', 'buyer')
>>>>>>> b1d2586ade328f31bc26ee39bd1ea85c6729d117

