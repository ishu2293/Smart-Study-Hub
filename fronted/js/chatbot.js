async function sendMessage() {
  const input = document.getElementById("input");
  const chatBox = document.getElementById("chatBox");

  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatBox.innerHTML += `<div class="user">You: ${message}</div>`;

  try {
    const res = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    // ❗ check if server error
    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    // ❗ check if reply exists
    if (data.reply) {
      chatBox.innerHTML += `<div class="bot">Bot: ${data.reply}</div>`;
    } else {
      chatBox.innerHTML += `<div class="bot" style="color:red;">No response from AI</div>`;
    }

  } catch (err) {
    console.error(err);
    chatBox.innerHTML += `<div class="bot" style="color:red;">Error: Unable to connect to server</div>`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
}