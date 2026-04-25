const questions = [
  "Explain polymorphism",
  "What is REST API?",
  "What is JavaScript closure?",
  "How does Agile differ from Waterfall in Software Engineering?",
  "What is the difference between a process and a thread?",
  "Explain the components of the MVC architecture.",
  "What are the ACID properties in standard database transactions?",
  "Describe the TCP/IP connection handshake.",
  "What is the Virtual DOM and how does React use it?"
];

let currentQuestion = "";
let userAnswer = "";

// Start camera
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
  document.getElementById("video").srcObject = stream;
});

// Generate question
window.onload = () => {
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("question").innerText = currentQuestion;
};

// Speech recognition
function startRecording() {
  const recognition = new webkitSpeechRecognition();
  recognition.start();

  recognition.onresult = (event) => {
    userAnswer = event.results[0][0].transcript;
    document.getElementById("answer").innerText = userAnswer;
  };
}

// Send to backend
async function submitAnswer() {
  document.getElementById("result").innerText = "Analyzing answer...";

  try {
    const res = await fetchWithAuth("/ai/evaluate", {
      method: "POST",
      body: JSON.stringify({
        question: currentQuestion,
        answer: userAnswer
      })
    });

    if (res && res.ok) {
        const data = await res.json();
        document.getElementById("result").innerText = data.result || "Analyzed successfully!";
    } else {
        document.getElementById("result").innerText = "Failed to evaluate answer.";
    }
  } catch (err) {
      console.warn(err);
      document.getElementById("result").innerText = "Backend API not available.";
  }
}