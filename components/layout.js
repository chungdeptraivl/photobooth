function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  elements.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const resp = await fetch(file);
      if (!resp.ok) throw new Error(`Cannot load ${file}`);
      el.innerHTML = await resp.text();
    } catch (e) {
      el.innerHTML = `<p style="color:red;">Error loading: ${file}</p>`;
    }
  });
}
document.addEventListener("DOMContentLoaded", includeHTML);
