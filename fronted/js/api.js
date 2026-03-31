const API = "http://localhost:5000/api";

// SAVE TOKEN
function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}