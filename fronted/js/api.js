const API = "http://localhost:5000/api";

async function sendMessageToBot(message) {
  const res = await fetch(API + "/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  return res.json();
}