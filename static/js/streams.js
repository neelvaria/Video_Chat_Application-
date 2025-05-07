const APP_ID = 'ed24ff7f45f746d999206407a57f62f3'
const channel = 'main'
const token = '007eJxTYOix37+6xCDqacoVLo8rOikrLOf9ZDHoCnA+H+BuUf188R0FBgPDRMPEVCCwTDIySTY1SjQxM08yMDYwNLE0MDQwSPrtJp3REMjIILCbgYWRAQJBfBaG3MTMPAYGABKFHd4='
let UID;

console.log("Stream is Connected!!")

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})
let localTracks = []
let remoteUsers = {}

let joinSuccess = async () => {
    client.on('user-published',handleUserJoined)
    client.on('user-left',handleUserleft)


    UID = await client.join(APP_ID, channel, token, null)  // <-- Capture UID
    console.log("Joined with UID:", UID);

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My Name:</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                  </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
    localTracks[1].play(`user-${UID}`);
    await client.publish([localTracks[0], localTracks[1]]);
}

let handleUserJoined = async(user,mediaType) => {
    remoteUsers[user.uid] = user;
    await client.subscribe(user, mediaType);

    if(mediaType === 'video') {
        let player = document.getElementById(`user-container-${user.uid}`);user.uid
        if(player!= null) player.remove();
    }

    player = `<div class="video-container" id="user-container-${user.uid}">
                    <div class="username-wrapper"><span class="user-name">My Name:</span></div>
                    <div class="video-player" id="user-${user.uid}"></div>
                  </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
    user.videoTrack.play(`user-${user.uid}`);

    if(mediaType === 'audio') {
        user.audioTrack.play();
    }
}

let handleUserleft = async(user) => {
    delete remoteUsers[user.uid];
    document.getElementById(`user-container-${user.uid}`).remove();
}

let leaveAndRemoveLocalStream = async() => {
    for (let i=0; localTracks.length > i; i++) {
        localTracks[i].stop();
        localTracks[i].close();
    }
    await client.leave()
    window.open('/','_self')
}

let toggleCamera = async(e) =>{
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false);
        e.target.style.backgroundColor = '#fff'
    }else{
        await localTracks[1].setMuted(true);
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

let toggleMic = async (e) => {
    console.log('TOGGLE MIC TRIGGERED')
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    }else{
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

joinSuccess()
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)