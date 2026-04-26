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

window.selectGame = function(game) {
    document.getElementById("gameSelection").style.display = "none";
    if (game === 'techTrivia') {
        document.getElementById("techTriviaArena").style.display = "block";
    } else if (game === 'algoBattle') {
        document.getElementById("algoArena").style.display = "block";
        initAlgoGame();
    }
    history.pushState({game: game}, '', '#' + game);
}

window.goBack = function() {
    document.getElementById("techTriviaArena").style.display = "none";
    document.getElementById("algoArena").style.display = "none";
    document.getElementById("gameSelection").style.display = "block";
    if (window.algoTimerInterval) {
        clearInterval(window.algoTimerInterval);
    }
}

window.addEventListener('popstate', function(event) {
    window.goBack();
});

// ALGORITHM BATTLE ARENA LOGIC
const algorithms = [
    {
        name: "Bubble Sort",
        steps: [
            "Start from the first element in the array.",
            "Compare the current element with the next element.",
            "If the current element is greater, swap them.",
            "Move to the next element and repeat until the end of the array.",
            "Repeat the entire process for N-1 passes."
        ]
    },
    {
        name: "Binary Search",
        steps: [
            "Find the middle element of the sorted array.",
            "If the middle element matches the target, return its index.",
            "If the target is less than the middle element, search the left half.",
            "If the target is greater, search the right half.",
            "Repeat until the target is found or the search space is empty."
        ]
    },
    {
        name: "Quick Sort",
        steps: [
            "Choose a pivot element from the array.",
            "Partition the array so elements less than pivot are on the left, and greater are on the right.",
            "Recursively apply the same logic to the left sub-array.",
            "Recursively apply the same logic to the right sub-array.",
            "Combine the sorted sub-arrays."
        ]
    }
];

let currentAlgo = null;
let availableSteps = [];
let selectedSteps = [];
window.algoTimerInterval = null;
let algoTimeMs = 0;

window.initAlgoGame = function() {
    currentAlgo = algorithms[Math.floor(Math.random() * algorithms.length)];
    
    availableSteps = [...currentAlgo.steps].sort(() => Math.random() - 0.5);
    selectedSteps = [];
    
    document.getElementById("algoNameDisplay").innerText = currentAlgo.name;
    
    algoTimeMs = 0;
    if (window.algoTimerInterval) clearInterval(window.algoTimerInterval);
    document.getElementById("algoTimerDisplay").innerText = "00.0s";
    
    window.algoTimerInterval = setInterval(() => {
        algoTimeMs += 100;
        document.getElementById("algoTimerDisplay").innerText = (algoTimeMs / 1000).toFixed(1) + "s";
    }, 100);

    renderAlgoSteps();
}

function renderAlgoSteps() {
    const availContainer = document.getElementById("availableStepsContainer");
    const selContainer = document.getElementById("selectedStepsContainer");
    if (!availContainer || !selContainer) return;
    
    availContainer.innerHTML = "";
    selContainer.innerHTML = "";
    
    availableSteps.forEach((step, index) => {
        const div = document.createElement("div");
        div.className = "algo-step";
        div.style.cursor = "pointer";
        div.innerHTML = `<span>${step}</span>`;
        div.onclick = () => {
            selectedSteps.push(step);
            availableSteps.splice(index, 1);
            renderAlgoSteps();
        };
        availContainer.appendChild(div);
    });
    
    selectedSteps.forEach((step, index) => {
        const div = document.createElement("div");
        div.className = "algo-step";
        div.style.cursor = "pointer";
        div.style.borderColor = "#66ffb3";
        div.style.background = "rgba(102,255,179,0.1)";
        div.innerHTML = `<span style="color:#66ffb3; font-weight:bold; margin-right: 15px;">Step ${index + 1}:</span> <span>${step}</span>`;
        div.onclick = () => {
            availableSteps.push(step);
            selectedSteps.splice(index, 1);
            renderAlgoSteps();
        };
        selContainer.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const checkAlgoBtn = document.getElementById("checkAlgoBtn");
    if (checkAlgoBtn) {
        checkAlgoBtn.addEventListener("click", () => {
            if (selectedSteps.length !== currentAlgo.steps.length) {
                alert("Please sequence all steps before verifying!");
                return;
            }
            
            let correct = true;
            for (let i = 0; i < selectedSteps.length; i++) {
                if (selectedSteps[i] !== currentAlgo.steps[i]) {
                    correct = false;
                    break;
                }
            }
            
            if (correct) {
                if (window.algoTimerInterval) clearInterval(window.algoTimerInterval);
                document.getElementById("resultTitle").innerText = "Algorithm Mastered! 🧠";
                document.getElementById("resultMsg").innerText = `You solved ${currentAlgo.name} in ${(algoTimeMs / 1000).toFixed(1)}s!`;
                document.getElementById("resultModal").style.display = "block";
            } else {
                alert("Incorrect order! Click steps to return them to the available pool and try again.");
            }
        });
    }
});
