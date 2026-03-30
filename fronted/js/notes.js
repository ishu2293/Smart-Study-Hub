const form = document.getElementById("noteForm");
const list = document.getElementById("notesList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const li = document.createElement("li");
  li.innerText = title + " - " + content;

  list.appendChild(li);
});