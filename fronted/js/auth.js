const API = "http://localhost:5000/api";

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


// REGISTER
if (registerForm) {
  registerForm.addEventListener("submit", async function(e) {
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