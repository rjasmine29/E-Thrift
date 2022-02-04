from rest_framework import serializers
from .models import Favourite
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token

class FavouriteSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source="user_id.username")
    class Meta:
        model = Favourite
        fields = ('id','user_id', 'item_id')
        # fields = '__all__'