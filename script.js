let recorder;
let autoplay = true;
let recordBtn = document.getElementById("recordBtn"),
stopBtn = document.getElementById("stopBtn"),
uploadBtn = document.getElementById("uploadBtn"),
audioContainer = document.getElementById("audioContainer");

if (navigator.mediaDevices === undefined) {
    window.alert("your browser does not support audio recording")
}

navigator.mediaDevices.getUserMedia({audio:true})
.then((mediaStream) => {
    recorder = new MediaRecorder(mediaStream);
    recorder.addEventListener('dataavailable', onRecordingReady);
    recordBtn.disabled = false;
})
.catch((err) => { window.alert("Initialization Error:\n" + err.message); });

let onRecordingReady = (e) => {
    let element = document.createElement("audio");
    let audioUrl = window.URL.createObjectURL(e.data);
    element.src = audioUrl;
    element.controls = true;
    element.loop = true;
    audioContainer.appendChild(element);
    if (autoplay) element.play(); else autoplay = true;
}

let stopAll = () => {
    var sounds = document.getElementsByTagName('audio');
    for (i=0; i<sounds.length; i++) sounds[i].pause();
}

let recordClick = () => {
    if (recorder.state == "recording") {
        recordBtn.classList.remove("activated");
        recorder.stop();
    } else {
        recordBtn.classList.add("activated");
        stopAll();
        recorder.start();
    }
}

let handleUpload = () => {
    let fileList = uploadBtn.files;
    for (let i = 0; i < fileList.length; i++) {
        let element = document.createElement("audio");
        let audioUrl = window.URL.createObjectURL(fileList[i]);
        element.src = audioUrl;
        element.controls = true;
        element.loop = true;
        audioContainer.appendChild(element);
    }
}

uploadBtn.addEventListener("change", handleUpload);
recordBtn.addEventListener("click", recordClick);
stopBtn.addEventListener("click", () => {
    if (recorder.state == "recording") {
        autoplay = false;
        recorder.stop();
        recordBtn.classList.remove("activated");
    } else stopAll();
});