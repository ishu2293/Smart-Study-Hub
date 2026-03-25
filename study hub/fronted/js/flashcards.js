let flipped = false;

function flipCard() {
  const card = document.getElementById("question");

  if (!flipped) {
    card.innerText = "Answer";
  } else {
    card.innerText = "Question";
  }

  flipped = !flipped;
}