// connect many device -- navigator
// usermedia -- webcam

const webcam = document.getElementById("main-video");
const callercam = document.getElementById("caller-video");
const desktop = document.getElementById("desktop");
const cam = document.getElementById("cam");
const mic = document.getElementById("mic");
const callerScreen = document.getElementById("caller-screen");

let camShareActive = false;
const camShare = (video = false, audio = false) => {
    navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then((stream) => {
            callercam.srcObject = stream;
            callercam.play();
            camShareActive = stream.active;
        })
        .catch((error) => {});
};

let screenShareActive = false;
const screenShare = (video = false, audio = false) => {
    navigator.mediaDevices
        .getDisplayMedia({ video: video, audio: audio })
        .then((stream) => {
            webcam.srcObject = stream;
            webcam.play();
            screenShareActive = stream.active;
        })
        .catch((error) => {
            console.log(error);
        });
};

const micShare = (video, audio) => {
    navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then((stream) => {
            webcam.srcObject = stream;
            webcam.play();
        })
        .catch();
};

cam.onclick = (e) => {
    camShare(true, true);
    cam.classList.add("active");

    setTimeout(() => {
        if (screenShareActive) {
            callerScreen.classList.add("active");
        }
    }, 5000);
};



desktop.onclick = () => {
    screenShare(true, true);
    desktop.classList.add("active");
    setTimeout(() => {
        if (screenShareActive) {
            if (camShareActive) {
                callerScreen.classList.add("active");
            }
        } else {
            callerScreen.style.display = "none";
        }
    }, 5000);
};



mic.onclick = () => {

    if (camShareActive) {
        micShare(true, true); 
    } else { 
        micShare(false, true);
    }
    mic.classList.add("active");
};
