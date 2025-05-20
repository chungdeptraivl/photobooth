const routes = {
  "": "pages/Home/homePage.html",
  "#home": "pages/Home/homePage.html",
  "#category": "pages/Category/categoryPage.html",
  "#takePhoto": "pages/TakePhotoBooth/takePhotoBoothPage.html",
  "#errorPage": "pages/ErrorPage/errorPage.html",
};

async function loadPageContent() {
  const path = window.location.hash || "#home";
  const page = routes[path] || routes["#errorPage"];

  try {
    const res = await fetch(page);
    const html = await res.text();
    document.getElementById("main-content").innerHTML = html;
  } catch (err) {
    document.getElementById("main-content").innerHTML = "<p>Lỗi tải trang.</p>";
  }
}

window.addEventListener("hashchange", loadPageContent);
window.addEventListener("DOMContentLoaded", loadPageContent);
