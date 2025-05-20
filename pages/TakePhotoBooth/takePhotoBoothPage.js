const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    alert("Không thể truy cập camera: " + err);
  });

function setFilter(filterValue) {
  video.style.filter = filterValue;
  canvas.dataset.filter = filterValue;
}

function capture() {
  const context = canvas.getContext("2d");
  canvas.style.display = "block";
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.filter = video.style.filter || "none";
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/png");
  photo.src = dataURL;
  photo.style.display = "block";
}
