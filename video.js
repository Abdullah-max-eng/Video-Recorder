
const video = document.getElementById("video");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const recordingIndicator = document.getElementById("recordingIndicator");

let mediaRecorder;
let chunks = [];

startButton.addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        chunks = [];
        const videoURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = videoURL;
        a.download = "recording.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();
        recordingIndicator.style.display = "none";
      };
      mediaRecorder.start();
      startButton.disabled = true;
      stopButton.disabled = false;
      recordingIndicator.style.display = "block";
    })
    .catch((error) => {
      console.error("Error accessing media devices.", error);
    });
});

stopButton.addEventListener("click", () => {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
    recordingIndicator.style.display = "none";
  });


  
  