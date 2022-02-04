from xml.dom import NotFoundErr
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from .models import Item
from .serializers import ItemSerialzer
from ..users.models import User
from rest_framework.decorators import api_view
from rest_framework.repsonse import Response
import cloudinary


def index(req):
    return HttpResponse('<h1>Root items page</h1>')

# Create your views here.
@api_view(['GET'])
def get_all_items(req):
    try:
        data = Item.objects.all()
        serializer = ItemSerialzer(data, many=True)
        data = {'data': serializer.data}
        return Response(data)
    except Exception as e:
        return Response({'Error': e})

def get_by_username(req, username):
    try:
        user = User.objects.get(username=username)
        items = Item.objects.filter(seller=user)
        serializer = ItemSerialzer(items, many=True)
        data = {'data': serializer.data}
        return Response(data)
    except NotFoundErr:
        return Response({'Error': 'Provided username doesnt exist'})

def get_by_item_id(req, item_id):
    try:
        item = Item.objects.get(id=item_id)
        serializer = ItemSerialzer(item)
        data = {'data': serializer.item}
        return Response(data)
    except NotFoundErr:
        return Response({'Error': 'Item Not Found'})

@api_view(['POST'])
def create(req):
    try:
        seller = User.objects.get(username=req.data['seller'])
        new_item = Item.objects.create( name = req.data['name'],
                                        description = req.data['description'],
                                        address = req.data['address'],
                                        img_url = req.data['img_url'],
                                        category = req.data['category'],
                                        seller = seller)
        return Response({'Success': f'Created new listing with id: {new_item.id} and name {new_item.name}'})
    except Exception as e:
        return Response({'Error': e})

# updates whole item, maybe make new to ba able to update certain features
def update_listing(req):
    try:
        item = Item.objects.get(pk=req.data['id'])
        item.name = req.data['name']
        item.description = req.data['description']
        item.address = req.data['address']
        item.save() #this may update time not sure

        # if req.data["image"]:
        #     if item.img_url:
        #         cloudinary.uploader.destroy(item.image.public_id)
        #     item.img_url = req.data["image"]
        #     item.save()
            
        # if req.data["deleteImages"]:
        #     cloudinary.uploader.destroy(item.image.public_id)
        #     item.image = None
        #     item.save()

        return Response({"Success": "Updated the post!"})
    except Exception as e:
        return Response({'Error': e})

def delete(req):
    try:
        item = Item.objects.get(pk=req.data['id']) #pk vs id?
        
        #delete image form cloudinary
        # if item.img_url:
        #     cloudinary.
        item.delete()
        return Response({'Success': 'Listing Deleted'})
    except NotFoundErr:
        return Response({'Error': 'Item not found'})

def claim_item(req, item_id):
    try:
        item = Item.objects.get(pk=item_id)
        buyer = User.objects.get(username=req.data['username'])
        if not item.is_claimed:
            item.buyer = buyer
            item.is_claimed = True
            item.save()
        return Response({"Success": 'Successfully claimed item'})
    except Exception as e:
        return Response({'Error': f'error claiming item: {e}'})



