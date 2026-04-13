document.addEventListener("DOMContentLoaded", () => {
    // Array of words mapping to definitions and subjects
    const dictionary = [
        { word: "QUEUE", def: "A linear data structure following First-In-First-Out (FIFO).", subject: "DSA" },
        { word: "STACK", def: "A linear data structure following Last-In-First-Out (LIFO).", subject: "DSA" },
        { word: "ARRAY", def: "A collection of elements stored in contiguous memory locations.", subject: "DSA" },
        { word: "DEADLOCK", def: "Situation where processes wait indefinitely for each other.", subject: "OS" },
        { word: "PAGING", def: "Memory management scheme mapping logical addresses to physical.", subject: "OS" },
        { word: "NORMALIZATION", def: "Process of organizing data in a database to reduce redundancy.", subject: "DBMS" },
        { word: "INDEXING", def: "Technique to improve database query performance.", subject: "DBMS" },
        { word: "ROUTING", def: "Process of selecting paths in a network.", subject: "CN" },
        { word: "ENCRYPTION", def: "Protecting data during transmission by obscuring it.", subject: "CN" }
    ];

    let currentItem = null;
    let guessedSet = new Set();
    let maxLives = 5;
    let lives = 5;

    const wordDisplay = document.getElementById("wordDisplay");
    const keyboard = document.getElementById("keyboard");
    const definitionText = document.getElementById("definitionText");
    const subjectTag = document.getElementById("subjectTag");
    const livesText = document.getElementById("livesText");
    const skipBtn = document.getElementById("skipBtn");
    const resultModal = document.getElementById("resultModal");

    function renderLives() {
        livesText.innerHTML = `Lives: ${"❤️".repeat(lives)}${"🖤".repeat(maxLives - lives)}`;
        if (lives === 0) {
            gameOver(false);
        }
    }

    function renderWord() {
        wordDisplay.innerHTML = "";
        let won = true;
        for (let char of currentItem.word) {
            const div = document.createElement("div");
            div.className = "letter-slot";
            if (guessedSet.has(char)) {
                div.innerText = char;
            } else {
                div.innerText = "";
                won = false;
            }
            wordDisplay.appendChild(div);
        }
        if (won) gameOver(true);
    }

    function setupKeyboard() {
        keyboard.innerHTML = "";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let char of letters) {
            const btn = document.createElement("button");
            btn.className = "key-btn";
            btn.innerText = char;
            btn.addEventListener("click", () => handleGuess(char, btn));
            keyboard.appendChild(btn);
        }
    }

    function handleGuess(char, btn) {
        btn.disabled = true;
        guessedSet.add(char);
        if (!currentItem.word.includes(char)) {
            lives--;
            renderLives();
        }
        renderWord();
    }

    async function gameOver(isWin) {
        const buttons = document.querySelectorAll(".key-btn");
        buttons.forEach(b => b.disabled = true);
        
        if (isWin) {
            resultModal.style.display = "block";
            try {
                // Tracking
                await fetchWithAuth("/flashcards/practice", {
                    method: "POST",
                    body: JSON.stringify({ isCorrect: true, subject: currentItem.subject })
                });
            } catch(e) {
                console.error("Tracking Error:", e);
            }
        } else {
            alert(`Game Over! The word was: ${currentItem.word}`);
            try {
                await fetchWithAuth("/flashcards/practice", {
                    method: "POST",
                    body: JSON.stringify({ isCorrect: false, subject: currentItem.subject })
                });
            } catch(e) {
                console.error("Tracking Error:", e);
            }
            initGame();
        }
    }

    function initGame() {
        if(resultModal) resultModal.style.display = "none";
        currentItem = dictionary[Math.floor(Math.random() * dictionary.length)];
        guessedSet.clear();
        lives = maxLives;
        
        if (definitionText) definitionText.innerText = `"${currentItem.def}"`;
        if (subjectTag) subjectTag.innerText = `SUBJECT FIELD: ${currentItem.subject}`;
        
        if(wordDisplay) {
            renderWord();
            renderLives();
            setupKeyboard();
        }
    }

    if (skipBtn) {
        skipBtn.addEventListener("click", initGame);
    }

    initGame();
});
