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
    if (autoplay) {element.play(); autoplay = false;}
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

recordBtn.addEventListener("click", recordClick);
stopBtn.addEventListener("click", () => {
    if (recorder.state == "recording") {
        autoplay = false;
        recorder.stop();
        recordBtn.classList.remove("activated");
    } else stopAll();
});