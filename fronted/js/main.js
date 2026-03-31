function goToNotes(subject) {
  localStorage.setItem("selectedSubject", subject);
  window.location.href = "notes.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}