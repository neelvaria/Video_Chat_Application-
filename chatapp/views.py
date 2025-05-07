from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
from django.http import HttpResponse, JsonResponse
import random 
import time

# Create your views here.
def lobby(request):
    return render(request, 'lobby.html')

def room(request):
    return render(request, 'room.html')

def get_token(request):
    appId = '01a1aeeee9b24c52a467b0301490100b'
    appCertificate = 'ce93f1e58b684a75880dc0d6aef218a2'
    channelName = request.GET.get('channel')
    uid = random.randint(1,200)
    role = 1
    expirationTimeInSeconds = 3600 * 24
    currentTimeStamp = int(time.time())
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({"token": token,'uid':uid}, safe=False)