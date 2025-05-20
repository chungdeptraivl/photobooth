const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const countdown = document.getElementById("countdown");
const photosContainer = document.getElementById("photos");

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

async function startMultiCapture() {
  photosContainer.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    await countdownAndCapture(i + 1);
  }
}

function countdownAndCapture(index) {
  return new Promise((resolve) => {
    let count = 3;
    countdown.style.display = "block";
    countdown.textContent = count;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        countdown.textContent = count;
      } else {
        clearInterval(interval);
        countdown.style.display = "none";
        const img = document.createElement("img");
        img.className = "photo";
        img.src = capture();
        photosContainer.appendChild(img);
        resolve();
      }
    }, 1000);
  });
}

function capture() {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.filter = video.style.filter || "none";
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}
