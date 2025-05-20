const routes = {
  "": { path: "pages/Home/homePage.html", init: "initHomePage" },
  "#home": { path: "pages/Home/homePage.html", init: "initHomePage" },
  "#category": {
    path: "pages/Category/categoryPage.html",
    init: "initCategoryPage",
  },
  "#takePhoto": {
    path: "pages/TakePhotoBooth/takePhotoBoothPage.html",
    init: "initTakePhoto",
  },
  "#errorPage": {
    path: "pages/ErrorPage/errorPage.html",
    init: "initErrorPage",
  },
};

async function loadPageContent() {
  const hashPath = window.location.hash || "#home";
  const route = routes[hashPath] || routes["#errorPage"];

  if (hashPath !== "#takePhoto") {
    stopCamera();
  }

  try {
    const res = await fetch(route.path);
    const html = await res.text();
    document.getElementById("main-content").innerHTML = html;

    if (route.init && typeof window[route.init] === "function") {
      window[route.init]();
    } else {
      console.warn(
        `Không tìm thấy hàm khởi tạo '${route.init}' cho route '${hashPath}'.`
      );
    }
  } catch (err) {
    document.getElementById("main-content").innerHTML = "<p>Lỗi tải trang.</p>";
  }
}

function stopCamera() {
  if (video && video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }
}

window.addEventListener("hashchange", loadPageContent);
window.addEventListener("DOMContentLoaded", loadPageContent);
