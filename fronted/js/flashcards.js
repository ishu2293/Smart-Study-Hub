let flipped = false;
let currentIndex = 0;
let flashcards = [];

document.addEventListener("DOMContentLoaded", async () => {
    // fetch backend flashcards
    try {
        const res = await fetchWithAuth("/flashcards");
        if (res && res.ok) {
            flashcards = await res.json();
        }
    } catch(err) {
        console.error("Failed fetching flashcards from backend", err);
    }

    // Default flashcards
    const defaultFlashcards = [
        { subject: "DSA", question: "What is time complexity?", answer: "It measures how runtime grows with input size.", fallback: true },
        { subject: "DSA", question: "What is a stack?", answer: "A data structure that follows LIFO.", fallback: true },
        { subject: "OS", question: "What is a process?", answer: "A program in execution.", fallback: true },
        { subject: "WAD", question: "What is the DOM?", answer: "Document Object Model, a programming API for HTML and XML documents.", fallback: true },
        { subject: "SE", question: "What is Agile?", answer: "An iterative approach to software development.", fallback: true }
    ];

    // Merge user flashcards with default flashcards
    flashcards = [...flashcards, ...defaultFlashcards];
    
    // Inject custom UI for correct/wrong if not already there
    const container = document.querySelector(".flashcard-container");
    if (container && !document.getElementById("practiceBtns")) {
        const practiceDiv = document.createElement("div");
        practiceDiv.id = "practiceBtns";
        practiceDiv.style.marginTop = "20px";
        practiceDiv.innerHTML = `
            <button onclick="markAnswer(true)" style="background:green; padding:10px 20px; border:none; border-radius:5px; color:white; cursor:pointer; margin-right:10px;">I knew it (Correct)</button>
            <button onclick="markAnswer(false)" style="background:red; padding:10px 20px; border:none; border-radius:5px; color:white; cursor:pointer;">I missed it (Wrong)</button>
        `;
        container.appendChild(practiceDiv);
    }

    // CREATE FLASHCARD FORM LOGIC
    const createFlashcardForm = document.getElementById("createFlashcardForm");
    if (createFlashcardForm) {
        createFlashcardForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const content = document.getElementById("fcContent").value.trim();
            let subject = "General";
            let question = "Concept";
            let answer = content;

            // Smart Parsing logic
            if (content.includes("?")) {
                const parts = content.split("?");
                question = parts[0].trim() + "?";
                answer = parts.slice(1).join("?").trim() || "No answer provided";
            } else if (content.includes("-")) {
                const parts = content.split("-");
                question = parts[0].trim();
                answer = parts.slice(1).join("-").trim() || "No answer provided";
            }

            try {
                const res = await fetchWithAuth("/flashcards", {
                    method: "POST",
                    body: JSON.stringify({ subject, question, answer })
                });

                if (res && res.ok) {
                    alert("Flashcard Added!");
                    window.location.reload();
                } else {
                    alert("Failed to add flashcard.");
                }
            } catch(err) {
                console.error(err);
                alert("Error adding flashcard");
            }
        });
    }

    loadCard();
});

function loadCard() {
    const qElem = document.getElementById("question");
    if (qElem && flashcards.length > 0) {
        qElem.innerText = flashcards[currentIndex].question;
    }
}

function flipCard() {
    if (flashcards.length === 0) return;
    const card = document.getElementById("question");

    if (!flipped) {
        card.innerText = flashcards[currentIndex].answer;
    } else {
        card.innerText = flashcards[currentIndex].question;
    }

    flipped = !flipped;
}

function nextCard() {
    if (flashcards.length === 0) return;
    currentIndex = (currentIndex + 1) % flashcards.length;
    flipped = false;
    loadCard();
}

async function markAnswer(isCorrect) {
    if (flashcards.length === 0) return;
    
    // Practice logic using API
    const card = flashcards[currentIndex];
    
    // Show a small indication
    alert(isCorrect ? "Marked as correct!" : "Marked as wrong, review this later!");

    try {
        await fetchWithAuth("/flashcards/practice", {
            method: "POST",
            body: JSON.stringify({ isCorrect, subject: card.subject })
        });
    } catch(err) {
        console.warn("Could not save progress:", err);
    }
    
    nextCard();
}