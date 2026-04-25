document.addEventListener("DOMContentLoaded", () => {

  const subjectSelect = document.getElementById("subjectSelect");
  const modeSelect = document.getElementById("modeSelect");
  const mainText = document.getElementById("mainText");
  const optionsContainer = document.getElementById("optionsContainer");
  const progressText = document.getElementById("progressText");
  const resultText = document.getElementById("resultText");

  const data = {

    DSA: {
      revision: [
        { title: "Binary Search", content: "Search in sorted array, time complexity O(log n)" },
        { title: "Stack", content: "LIFO data structure used in recursion" },
        { title: "Queue", content: "FIFO structure used in BFS" },
        { title: "Merge Sort", content: "Divide and conquer sorting, O(n log n)" },
        { title: "Hashing", content: "Maps keys to values using hash function" }
      ],
      quiz: [
        { q: "Time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct: 1 },
        { q: "Which uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], correct: 1 },
        { q: "Merge Sort complexity?", options: ["O(n^2)", "O(n log n)", "O(log n)", "O(n)"], correct: 1 },
        { q: "Which uses FIFO?", options: ["Stack", "Queue", "Graph", "Tree"], correct: 1 },
        { q: "Hashing is used for?", options: ["Sorting", "Searching", "Indexing", "All"], correct: 3 }
      ]
    },

    DBMS: {
      revision: [
        { title: "SQL", content: "Language to manage relational databases" },
        { title: "Normalization", content: "Process to remove redundancy" },
        { title: "ACID Properties", content: "Atomicity, Consistency, Isolation, Durability" },
        { title: "Indexing", content: "Improves query performance" },
        { title: "Primary Key", content: "Unique identifier for records" }
      ],
      quiz: [
        { q: "SQL stands for?", options: ["Structured Query Language", "Simple Query", "System Query", "None"], correct: 0 },
        { q: "Primary Key is?", options: ["Duplicate", "Unique", "Null", "Optional"], correct: 1 },
        { q: "Normalization does?", options: ["Increase redundancy", "Reduce redundancy", "Delete data", "None"], correct: 1 },
        { q: "ACID stands for?", options: ["4 properties", "2 properties", "Sorting", "Indexing"], correct: 0 },
        { q: "Indexing improves?", options: ["Speed", "Storage", "Delete", "None"], correct: 0 }
      ]
    },

    OS: {
      revision: [
        { title: "CPU Scheduling", content: "Decides which process runs next" },
        { title: "Deadlock", content: "Processes waiting indefinitely" },
        { title: "Paging", content: "Memory management technique" },
        { title: "Process", content: "Program in execution" },
        { title: "Thread", content: "Lightweight process" }
      ],
      quiz: [
        { q: "Which is scheduling algorithm?", options: ["FCFS", "JOIN", "MERGE", "SELECT"], correct: 0 },
        { q: "Deadlock means?", options: ["Execution", "Waiting forever", "Running", "None"], correct: 1 },
        { q: "Paging is?", options: ["CPU", "Memory", "Disk", "Network"], correct: 1 },
        { q: "Process is?", options: ["File", "Program execution", "Memory", "None"], correct: 1 },
        { q: "Thread is?", options: ["Heavy", "Lightweight process", "CPU", "None"], correct: 1 }
      ]
    },

    CN: {
      revision: [
        { title: "OSI Model", content: "7 layer communication model" },
        { title: "TCP", content: "Reliable protocol" },
        { title: "UDP", content: "Fast but unreliable" },
        { title: "IP Address", content: "Unique device identifier" },
        { title: "Routing", content: "Path selection in network" }
      ],
      quiz: [
        { q: "OSI layers count?", options: ["5", "6", "7", "8"], correct: 2 },
        { q: "TCP is?", options: ["Fast", "Reliable", "None", "Random"], correct: 1 },
        { q: "UDP is?", options: ["Reliable", "Slow", "Fast", "None"], correct: 2 },
        { q: "IP Address is?", options: ["Name", "Identifier", "File", "None"], correct: 1 },
        { q: "Routing means?", options: ["Path selection", "Speed", "Delete", "None"], correct: 0 }
      ]
    },

    SE: {
      revision: [
        { title: "Software Development Life Cycle", content: "Process of planning, creating, testing, and deploying." },
        { title: "Agile Model", content: "Iterative approach focusing on customer collaboration." },
        { title: "White Box Testing", content: "Testing internal structures or workings of an application." },
        { title: "Black Box Testing", content: "Testing functionality without knowing internal structure." },
        { title: "Design Patterns", content: "Typical solutions to common problems in software design." }
      ],
      quiz: [
        { q: "What does SDLC stand for?", options: ["Software Design Life Cycle", "System Development Life Cycle", "Software Development Life Cycle", "System Design Life Cycle"], correct: 2 },
        { q: "Which model is iterative?", options: ["Waterfall", "Agile", "V-Model", "None"], correct: 1 },
        { q: "White box testing involves?", options: ["Internal structure", "Only outputs", "Hardware", "Users"], correct: 0 },
        { q: "Singleton is a?", options: ["Testing Method", "Design Pattern", "Process", "Algorithm"], correct: 1 },
        { q: "Agile values?", options: ["Documentation over execution", "Customer collaboration", "Strict schedules", "Large teams"], correct: 1 }
      ]
    },

    WAD: {
      revision: [
        { title: "HTML/CSS", content: "Building blocks for web structure and styling." },
        { title: "DOM", content: "Document Object Model, programming interface for web documents." },
        { title: "REST API", content: "Architecture style for distributed hypermedia systems." },
        { title: "Frontend Frameworks", content: "Libraries like React, Vue, Angular for building UIs." },
        { title: "JWT", content: "JSON Web Tokens for secure authentication." }
      ],
      quiz: [
        { q: "DOM stands for?", options: ["Document Object Model", "Data Object Model", "Document Orientation Model", "None"], correct: 0 },
        { q: "REST is?", options: ["Framework", "Language", "Architectural Style", "Database"], correct: 2 },
        { q: "Which is a frontend framework?", options: ["Express", "MongoDB", "React", "NodeJS"], correct: 2 },
        { q: "JWT is used for?", options: ["Styling", "Authentication", "Routing", "Database"], correct: 1 },
        { q: "CSS stands for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct: 0 }
      ]
    }

  };

  let items = [];
  let index = 0;
  let score = 0;
  let answered = false;

  function loadData() {
    const subject = subjectSelect.value;
    const mode = modeSelect.value;

    if (!subject || !data[subject]) return;

    items = [...data[subject][mode]];
    items.sort(() => Math.random() - 0.5);

    index = 0;
    score = 0;
    resultText.innerText = "";

    show();
  }

  subjectSelect.addEventListener("change", loadData);
  modeSelect.addEventListener("change", loadData);

  function show() {
    if (index >= items.length) {
      showResult();
      return;
    }

    const mode = modeSelect.value;
    const item = items[index];

    optionsContainer.innerHTML = "";
    answered = false;

    if (mode === "revision") {
      mainText.innerText = item.title + " - " + item.content;
    } else {
      mainText.innerText = item.q;

      item.options.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(i);
        optionsContainer.appendChild(btn);
      });
    }

    progressText.innerText =
      `${index + 1} / ${items.length} | Score: ${score}`;
  }

  function checkAnswer(selected) {
    if (answered) return;

    const correct = items[index].correct;
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((btn, i) => {
      if (i === correct) btn.style.background = "green";
      else if (i === selected) btn.style.background = "red";
      btn.disabled = true;
    });

    if (selected === correct) score++;

    // Sync progress tracking to backend
    const subject = subjectSelect.value;
    const isCorrect = (selected === correct);
    
    // We expect fetchWithAuth to be available globally from api.js
    if (typeof fetchWithAuth === 'function') {
        fetchWithAuth("/flashcards/practice", {
            method: "POST",
            body: JSON.stringify({ isCorrect, subject })
        }).catch(err => console.warn("Could not sync revision score:", err));
    }

    answered = true;
  }

  window.next = function () {
    if (!subjectSelect.value) {
      alert("First choose the subject");
      return;
    }
    if (modeSelect.value === "quiz" && !answered) return;

    index++;
    show();
  };

  function showResult() {
    mainText.innerText = "Completed";
    optionsContainer.innerHTML = "";
    progressText.innerText = "";

    if (modeSelect.value === "quiz") {
      resultText.innerText = "Final Score: " + score + " / " + items.length;
    }
  }

});