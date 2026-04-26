const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:5000/api' 
  : '/api';

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    console.warn("No token found. Redirecting to login.");
    window.location.href = "login.html";
    return null;
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(API + url, config);
    if (response.status === 401) {
      // Token expired or invalid
      console.warn("Token expired or invalid. Redirecting to login.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "login.html";
      return null;
    }
    return response;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

async function sendMessageToBot(message) {
  const res = await fetchWithAuth("/ai", {
    method: "POST",
    body: JSON.stringify({ message })
  });

  if (res) return res.json();
  return null;
}