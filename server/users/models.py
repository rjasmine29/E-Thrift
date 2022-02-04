from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from cloudinary.models import CloudinaryField
# ('username', 'first_name', 'last_name', 'email', 'password', 'password_confirmation', 'phone_number', 'avatar_url' )

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.IntegerField(null=True, blank=True)
    avatar_url = CloudinaryField('image', blank=True, null=True)

 