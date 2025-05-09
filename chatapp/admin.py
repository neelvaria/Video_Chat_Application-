from django.contrib import admin
from .models import RoomMember
# Register your models here.

class RoomMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'uid', 'room_name')

admin.site.register(RoomMember, RoomMemberAdmin)