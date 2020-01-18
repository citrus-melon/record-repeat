let recorder;
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
    element.play();
}

let recordClick = () => {
    if (recorder.state == "recording") {
        recordBtn.classList.remove("activated");
        recorder.stop();
    } else {
        recordBtn.classList.add("activated");
        recorder.start();
    }
}

recordBtn.addEventListener("click", recordClick);