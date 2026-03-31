<<<<<<< HEAD
const loginForm = document.getElementById("loginForm");
=======
const API = "http://localhost:5000/api";

>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
const registerForm = document.getElementById("registerForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: email.value,
      password: password.value
    };

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  });
}

<<<<<<< HEAD
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
=======

// REGISTER
if (registerForm) {
  registerForm.addEventListener("submit", async function(e) {
>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
    e.preventDefault();

    const data = {
      email: email.value,
      password: password.value
    };

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  });
}