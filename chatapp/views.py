from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
from django.http import HttpResponse, JsonResponse
import random , time , json
from .models import * 
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def lobby(request):
    return render(request, 'lobby.html')

def room(request):
    return render(request, 'room.html')

def get_token(request):
    appId = '01a1aeeee9b24c52a467b0301490100b'
    appCertificate = 'ce93f1e58b684a75880dc0d6aef218a2'
    channelName = request.GET.get('channel')
    if not channelName:
        return JsonResponse({"error": "Missing channel name"}, status=400)
    
    uid = random.randint(1,200)
    role = 1
    expirationTimeInSeconds = 3600 * 24
    currentTimeStamp = int(time.time())
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({"token": token,'uid':uid}, safe=False)

@csrf_exempt
def create_member(request):
    data = json.loads(request.body)
    member, created = RoomMember.objects.get_or_create(
        name=data['name'],
        uid=data['UID'],
        room_name=data['room_name']
    )
    return JsonResponse({'name':data['name']},safe=False)

def getMember(request):
    uid = request.GET.get('UID')
    room_name = request.GET.get('room_name')

    member = RoomMember.objects.get(
        uid=uid,
        room_name=room_name,
    )
    name = member.name
    return JsonResponse({'name':member.name}, safe=False)

@csrf_exempt
def deleteMember(request):
    data = json.loads(request.body)
    member = RoomMember.objects.get(
        name=data['name'],
        uid=data['UID'],
        room_name=data['room_name']
    )
    member.delete()
    return JsonResponse('Member deleted', safe=False)