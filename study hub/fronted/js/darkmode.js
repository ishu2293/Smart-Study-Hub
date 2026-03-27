const toggle = document.getElementById("darkToggle");

function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

toggle?.addEventListener("click", () => {
  const current = document.body.className;
  setTheme(current === "dark" ? "light" : "dark");
});

window.onload = () => {
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
};