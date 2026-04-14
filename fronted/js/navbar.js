document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
  <nav class="navbar">
    <h1>
      <i class="fa-solid fa-user-graduate"></i>
      StudyHub
    </h1>

    <!-- Navigation Options -->
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="dsa.html">DSA</a></li>
      <li><a href="flashcards.html">Flashcard</a></li>
      <li><a href="revesion.html">Revision</a></li>
      <li><a href="subjects.html">Subjects</a></li>
      <li><a href="chatbot.html">AI Chat</a></li>
      <li><a href="interview.html">Mock Interview</a></li>
    </ul>

    <!-- Login & Register at end -->
    <div class="auth-links">
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    </div>
  </nav>
  `;

  // Insert navbar at the very top of the body
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});
