const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:5000/api' 
  : '/api';

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    // In case there are no IDs but generic inputs
    const email = emailInput ? emailInput.value : document.querySelector('input[type="email"]').value;
    const password = passwordInput ? passwordInput.value : document.querySelector('input[type="password"]').value;

    const data = { email, password };

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });

      const result = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert(result.message || "Logged in successfully!");
        window.location.href = "dashboard.html";
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    const email = emailInput ? emailInput.value : document.querySelector('input[type="email"]').value;
    const password = passwordInput ? passwordInput.value : document.querySelector('input[type="password"]').value;

    const data = { email, password };

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });

      const result = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert(result.message || "Registered successfully!");
        window.location.href = "dashboard.html";
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering");
    }
  });
}

// LOGOUT function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Attach logout to any button with id="logoutBtn"
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
});

// Reset Password
const resetPasswordForm = document.getElementById("resetPasswordForm");

if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;
    const newPassword = document.getElementById("newPassword").value;

    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message || "Password updated! Please login.");
        window.location.href = "login.html";
      } else {
        alert(result.message || "Failed to reset password.");
      }
    } catch(err) {
      console.error(err);
      alert("Error processing request.");
    }
  });
}