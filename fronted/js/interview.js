const questions = [
  "Explain polymorphism",
  "What is REST API?",
  "What is JavaScript closure?"
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
  const res = await fetch("http://localhost:5000/api/ai/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: currentQuestion,
      answer: userAnswer
    })
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.result;
}