const APP_ID = '01a1aeeee9b24c52a467b0301490100b'
const channel = sessionStorage.getItem('room')
const token = sessionStorage.getItem('token')
let UID = sessionStorage.getItem('uid');

let name = sessionStorage.getItem('name')

console.log("Stream is Connected!!")

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})
let localTracks = []
let remoteUsers = {}

let joinSuccess = async () => {
    document.getElementById('room-name').innerText = channel
    
    client.on('user-published',handleUserJoined)
    client.on('user-left',handleUserleft)

    try{
        await client.join(APP_ID, channel, token, UID)
    }catch(error){
        console.error(error)
        window.open('/','_self')
    }

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    let member = await createMember();
    console.log(member)

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">${member.name}</span></div>
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

    let member = await getMember(user);

    player = `<div class="video-container" id="user-container-${user.uid}">
                    <div class="username-wrapper"><span class="user-name">${member.name}</span></div>
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

let createMember = async () => {
    let respose = await fetch('/create_member/',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'name': name,
        'room_name': channel,
        'uid': UID
    })
})
    let member = await respose.json()
    return member
}

let getMember = async (user) => {
    let response = await fetch(`/get_member/?UID=${user.uid}&room_name=${channel}`)
    let member = await response.json()
    return member
}

let deleteMember = async () => {
    let response = await fetch('/delete_member/', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'name':name, 'room_name':channel, 'Uid':UID})
    })
    let member = await response.json()
}
window.addEventListener("beforeunload",deleteMember);


joinSuccess()
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)