let flipped = false;
let currentIndex = 0;

const flashcards = [
  { subject: "DSA", question: "What is time complexity?", answer: "It measures how runtime grows with input size." },
  { subject: "DSA", question: "What is a stack?", answer: "A data structure that follows LIFO." },

  { subject: "DBMS", question: "What is a primary key?", answer: "A unique identifier for each record." },
  { subject: "DBMS", question: "What is normalization?", answer: "Reducing redundancy in database." },

  { subject: "OS", question: "What is a process?", answer: "A program in execution." },
  { subject: "OS", question: "What is deadlock?", answer: "Processes waiting indefinitely for resources." },

  { subject: "CN", question: "What is an IP address?", answer: "Unique address of a device on a network." },
  { subject: "CN", question: "What is TCP?", answer: "A reliable communication protocol." }
];

function loadCard() {
  document.getElementById("question").innerText =
    flashcards[currentIndex].question;
}

function flipCard() {
  const card = document.getElementById("question");

  if (!flipped) {
    card.innerText = flashcards[currentIndex].answer;
  } else {
    card.innerText = flashcards[currentIndex].question;
  }

  flipped = !flipped;
}

function nextCard() {
  currentIndex = (currentIndex + 1) % flashcards.length;
  flipped = false;
  loadCard();
}

loadCard();