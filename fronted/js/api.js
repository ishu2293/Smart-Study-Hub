<<<<<<< HEAD
const API = "http://localhost:5000/api";

// SAVE TOKEN
function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
=======
const BASE_URL = "http://localhost:5000/api";

async function postData(url, data) {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
}