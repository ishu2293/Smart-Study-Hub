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
        { title: "Binary Search", content: "Search in a sorted array by repeatedly dividing the search interval in half. Time complexity is O(log n)." },
        { title: "Stack", content: "LIFO (Last-In-First-Out) data structure commonly used in recursive algorithms, undo mechanics, and parsing expressions." },
        { title: "Queue", content: "FIFO (First-In-First-Out) structure typically used in Breadth-First Search (BFS) and CPU task scheduling." },
        { title: "Merge Sort", content: "A highly efficient, stable sorting algorithm based on the divide and conquer paradigm with an O(n log n) time complexity." },
        { title: "Hashing", content: "A technique that maps data of arbitrary size to fixed-size values using a hash function, optimizing search times to O(1)." }
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
        { title: "SQL", content: "Structured Query Language used to manage, store, and retrieve data efficiently within relational databases." },
        { title: "Normalization", content: "The process of organizing data to minimize redundancy and eliminate undesirable characteristics like Insertion, Update, and Deletion anomalies." },
        { title: "ACID Properties", content: "Atomicity, Consistency, Isolation, and Durability - core principles ensuring reliable and predictable database transactions." },
        { title: "Indexing", content: "A data structure technique used to quickly locate and access the data in a database table, drastically improving query speed." },
        { title: "Primary Key", content: "A specific choice of a minimal set of attributes that uniquely identifiers a record in a database table. It cannot contain null values." }
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
        { title: "CPU Scheduling", content: "The primary mechanism for the OS to decide which process runs next, optimizing resource utilization and throughput." },
        { title: "Deadlock", content: "A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process." },
        { title: "Paging", content: "A memory management scheme that eliminates the need for contiguous allocation of physical memory by retrieving processes in blocks of the same size." },
        { title: "Process", content: "A program in execution, encompassing the program code, its current activity, and its set of necessary system resources." },
        { title: "Thread", content: "The smallest sequence of programmed instructions that can be managed independently by a scheduler. Known as a lightweight process." }
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
        { title: "OSI Model", content: "A conceptual framework that describes the functions of a networking system through 7 distinct layers (Physical to Application)." },
        { title: "TCP", content: "Transmission Control Protocol - a connection-oriented, reliable protocol ensuring data is delivered completely and without errors." },
        { title: "UDP", content: "User Datagram Protocol - a connectionless, non-reliable protocol that prioritizes fast and continuous transmission over error-checking." },
        { title: "IP Address", content: "A unique numerical identifier assigned to every device participating in a computer network that uses the Internet Protocol." },
        { title: "Routing", content: "The process of selecting paths and forwarding network traffic in a network, usually performed by dedicated routers." }
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
        { title: "Software Development Life Cycle", content: "A structured process spanning planning, creating, testing, and deploying an information system." },
        { title: "Agile Model", content: "An iterative development approach focusing on rapid delivery, continuous feedback, and active customer collaboration." },
        { title: "White Box Testing", content: "A method of software testing that tests internal structures or workings of an application, as opposed to its functionality." },
        { title: "Black Box Testing", content: "Testing functionality without knowing the internal structure, directly examining inputs and expected outputs." },
        { title: "Design Patterns", content: "Typical, reusable solutions to common problems in software design, such as Singleton, Factory, and Observer patterns." }
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
        { title: "HTML/CSS", content: "Standard building blocks for web pages. HTML provides the fundamental structure, while CSS manages the visual presentation and styling." },
        { title: "DOM", content: "The Document Object Model is a cross-platform programming interface that treats an HTML or XML document as a tree structure wherein each node is an object." },
        { title: "REST API", content: "Representational State Transfer is an architectural style used in web services, communicating over HTTP utilizing uniform stateless operations." },
        { title: "Frontend Frameworks", content: "Sophisticated libraries and toolsets like React, Vue, or Angular designed to structure and rapidly build complex, interactive web UIs." },
        { title: "JWT", content: "JSON Web Tokens are an open standard for securely transmitting verified information between parties as a compact, self-contained JSON object." }
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

    // IDs of the new layout components
    const placeholderLayout = document.getElementById("placeholderLayout");
    const revisionLayout = document.getElementById("revisionLayout");
    const quizLayout = document.getElementById("quizLayout");
    const revTitle = document.getElementById("revTitle");
    const revContent = document.getElementById("revContent");
    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");

    quizOptions.innerHTML = "";
    answered = false;

    if (placeholderLayout) placeholderLayout.style.display = "none";

    if (mode === "revision") {
      revisionLayout.style.display = "grid";
      quizLayout.style.display = "none";
      
      revTitle.innerText = item.title;
      revContent.innerText = item.content;
    } else {
      revisionLayout.style.display = "none";
      quizLayout.style.display = "block";
      
      quizQuestion.innerText = item.q;

      item.options.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(i);
        quizOptions.appendChild(btn);
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
      if (i === correct) {
        btn.style.background = "green";
        btn.style.color = "white";
      } else if (i === selected) {
        btn.style.background = "red";
        btn.style.color = "white";
      }
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
    progressText.innerText = "";

    const revisionLayout = document.getElementById("revisionLayout");
    const quizLayout = document.getElementById("quizLayout");
    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");
    const revTitle = document.getElementById("revTitle");
    const revContent = document.getElementById("revContent");

    if (modeSelect.value === "quiz") {
      revisionLayout.style.display = "none";
      quizLayout.style.display = "block";
      quizQuestion.innerText = "Completed!";
      quizOptions.innerHTML = "";
      resultText.innerText = "Final Score: " + score + " / " + items.length;
    } else {
      revisionLayout.style.display = "grid";
      quizLayout.style.display = "none";
      revTitle.innerText = "Completed!";
      revContent.innerText = "You have reviewed all topics.";
      resultText.innerText = "";
    }
  }

});