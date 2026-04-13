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