document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("user") || "Student";

  const dashboard = document.getElementById("dashboardData");

  if (dashboard) {
    dashboard.innerHTML = `
      <h3>Welcome, ${username}</h3>
      <p>Track your study progress here</p>
    `;
  }
});