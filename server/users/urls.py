from django.urls import path

from .views import MyTokenObtainPairView, BlacklistRefreshView, get_all_user
from .api import RegisterAPI


from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("", get_all_user, name="all"),
    path('register', RegisterAPI.as_view()),
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', BlacklistRefreshView.as_view(), name="logout"),
]