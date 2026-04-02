async function sendMessage() {
  const input = document.getElementById("input");
  const chatBox = document.getElementById("chatBox");

  const message = input.value;
  if (!message) return;

  chatBox.innerHTML += `<div class="user">You: ${message}</div>`;

  const res = await fetch("http://localhost:5000/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  // Show bot reply
  chatBox.innerHTML += `<div class="bot">Bot: ${data.reply}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
}