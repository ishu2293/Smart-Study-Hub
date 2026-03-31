<<<<<<< HEAD
// GET SUBJECT FROM URL
const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");

// SET SUBJECT TITLE
document.getElementById("subjectTitle").innerText = subject + " Notes";

// API URL
const API = "http://localhost:5000/api";

// GET TOKEN
function getToken() {
  return localStorage.getItem("token");
}

// ============================
// 📥 FETCH NOTES FROM BACKEND
// ============================
async function fetchNotes() {
  try {
    const res = await fetch(`${API}/notes/${subject}`, {
      headers: {
        "Authorization": getToken()
      }
    });

    const data = await res.json();
    displayNotes(data);

  } catch (err) {
    console.log("Error fetching notes:", err);
  }
}

// ============================
// 📤 DISPLAY NOTES
// ============================
function displayNotes(notes) {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML = "<p>No notes available</p>";
    return;
  }

  notes.forEach(note => {
    let li = document.createElement("li");

    li.innerHTML = `
      <strong>${note.title}</strong>
      <p>${note.content}</p>
    `;

    notesList.appendChild(li);
  });
}

// ============================
// ➕ ADD NOTE
// ============================
document.getElementById("noteForm").addEventListener("submit", async function(e) {
=======
const form = document.getElementById("noteForm");
const list = document.getElementById("notesList");

form.addEventListener("submit", (e) => {
>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

<<<<<<< HEAD
  if (!title || !content) return;

  try {
    await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken()
      },
      body: JSON.stringify({
        subject: subject,
        title: title,
        content: content
      })
    });

    // REFRESH NOTES AFTER ADD
    fetchNotes();

    // RESET FORM
    this.reset();

  } catch (err) {
    console.log("Error adding note:", err);
  }
});

// ============================
// 🚀 INITIAL LOAD
// ============================
fetchNotes();
=======
  const li = document.createElement("li");
  li.innerText = title + " - " + content;

  list.appendChild(li);
});
>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
