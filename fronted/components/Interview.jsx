import { useEffect, useRef, useState } from "react";

export default function Interview() {
  const videoRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  const questions = [
    "What is React?",
    "Explain polymorphism",
    "What is REST API?"
  ];

  useEffect(() => {
    startCamera();
    generateQuestion();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    videoRef.current.srcObject = stream;
  };

  const generateQuestion = () => {
    const q = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(q);
  };

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setAnswer(text);
    };
  };

  const submitAnswer = async () => {
    const res = await fetch("http://localhost:5000/api/interview/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question, answer })
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div>
      <h2>Mock Interview</h2>

      <video ref={videoRef} autoPlay width="300" />

      <h3>Question: {question}</h3>

      <button onClick={startSpeechRecognition}>
        Start Answer (Voice)
      </button>

      <p><b>Your Answer:</b> {answer}</p>

      <button onClick={submitAnswer}>Submit</button>

      <h3>Result:</h3>
      <p>{result}</p>
    </div>
  );
}