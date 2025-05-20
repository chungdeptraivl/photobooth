let video;
let canvas;
let countdown;
let photosContainer;

function initTakePhoto() {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  countdown = document.getElementById("countdown");
  photosContainer = document.getElementById("photos");

  if (!video || !canvas || !countdown || !photosContainer) {
    alert("Lỗi tải trang PhotoBooth. Vui lòng thử lại.");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      console.log("Camera đã được truy cập thành công.");
    })
    .catch((err) => {
      alert("Không thể truy cập camera: " + err);
    });
}

function setFilter(filterValue) {
  video.style.filter = filterValue;
  canvas.dataset.filter = filterValue;
}

async function startMultiCapture() {
  const placeholders = document.querySelectorAll(".photo-placeholder");
  for (let i = 0; i < 4; i++) {
    await countdownAndCapture(i + 1, placeholders[i]);
  }
}

function countdownAndCapture(index, placeholder) {
  return new Promise((resolve) => {
    let count = 3;
    countdown.style.display = "flex";
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
        placeholder.replaceWith(img); 
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

window.setFilter = setFilter;
window.startMultiCapture = startMultiCapture;
window.initTakePhoto = initTakePhoto;
