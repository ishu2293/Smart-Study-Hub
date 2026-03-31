let notesData = JSON.parse(localStorage.getItem("notesData")) || {};

let currentNotes = [];
let currentIndex = 0;

// SELECT SUBJECT
document.getElementById("subjectSelect").addEventListener("change", function() {
  const subject = this.value;

  if (!subject || !notesData[subject]) {
    document.getElementById("revisionText").innerText = "No notes available";
    return;
  }

  currentNotes = notesData[subject];
  currentIndex = 0;

  showNote();
});

// SHOW NOTE
function showNote() {
  if (currentNotes.length === 0) return;

  let note = currentNotes[currentIndex];

  document.getElementById("revisionText").innerText =
    note.title + " - " + note.content;
}

// NEXT BUTTON
function nextNote() {
  if (currentNotes.length === 0) return;

  currentIndex = (currentIndex + 1) % currentNotes.length;
  showNote();
}