from django.urls import path
from . import views

urlpatterns = [
    path('', views.lobby, name='lobby'),
    path('room/', views.room, name='room'),
    path('get_token/', views.get_token, name='get_token'),
    path('create_member/', views.create_member, name='create_member'),
    path('get_member/', views.getMember, name='get_member'),
    path('deleteMember/', views.deleteMember, name='deleteMember'),
]
