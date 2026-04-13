document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");

  const subjectTitle = document.getElementById("subjectTitle");
  const container = document.getElementById("chapters");

  // SUBJECT DATA
  const subjectsData = {
  DSA: {
    title: "Data Structures & Algorithms",
    youtube: "https://www.youtube.com/embed/8hly31xKli0",
    concepts: [
      {
        name: "Arrays",
        desc: "A collection of elements stored in contiguous memory locations.",
        detail: "Arrays provide O(1) access time using index. They are widely used for storing ordered data. However, size is fixed, and insertion/deletion operations can be costly."
      },
      {
        name: "Linked Lists",
        desc: "A linear data structure where elements are connected using pointers.",
        detail: "Unlike arrays, linked lists don’t require contiguous memory. Each node contains data and a reference to the next node. Types include singly, doubly, and circular linked lists."
      },
      {
        name: "Stacks",
        desc: "A linear data structure following LIFO (Last In First Out).",
        detail: "Operations include push, pop, and peek. Used in recursion, undo operations, and expression evaluation."
      },
      {
        name: "Queues",
        desc: "A linear structure following FIFO (First In First Out).",
        detail: "Used in scheduling, buffering, and BFS traversal. Variants include circular queue, priority queue, and deque."
      },
      {
        name: "Binary Search",
        desc: "An efficient algorithm to search in sorted arrays.",
        detail: "Works by repeatedly dividing the search space in half. Time complexity is O(log n). Requires sorted data."
      },
      {
        name: "Hash Tables",
        desc: "A structure that maps keys to values using a hash function.",
        detail: "Provides O(1) average time for insert/search/delete. Handles collisions using chaining or open addressing."
      }
    ]
  },

  DBMS: {
    title: "Database Management Systems",
    youtube: "https://www.youtube.com/embed/kBdlM6hNDAE",
    concepts: [
      {
        name: "SQL",
        desc: "Structured Query Language used to interact with databases.",
        detail: "Used for creating, reading, updating, and deleting data (CRUD). Includes commands like SELECT, INSERT, UPDATE, DELETE."
      },
      {
        name: "Normalization",
        desc: "Process of organizing data to reduce redundancy.",
        detail: "Divides tables into smaller ones and links them. Normal forms include 1NF, 2NF, 3NF, BCNF."
      },
      {
        name: "Transactions",
        desc: "A sequence of operations treated as a single unit.",
        detail: "Follows ACID properties: Atomicity, Consistency, Isolation, Durability."
      },
      {
        name: "Indexing",
        desc: "Technique to improve database query performance.",
        detail: "Indexes reduce search time. Types include primary index, secondary index, and clustered index."
      },
      {
        name: "ER Model",
        desc: "Entity-Relationship model for database design.",
        detail: "Represents entities, attributes, and relationships visually using ER diagrams."
      }
    ]
  },

  OS: {
    title: "Operating Systems",
    youtube: "https://www.youtube.com/embed/vBURTt97EkA",
    concepts: [
      {
        name: "Process Management",
        desc: "Handling processes in execution.",
        detail: "Includes process creation, scheduling, synchronization, and termination."
      },
      {
        name: "CPU Scheduling",
        desc: "Method to decide which process runs next.",
        detail: "Algorithms include FCFS, SJF, Round Robin, Priority Scheduling."
      },
      {
        name: "Memory Management",
        desc: "Managing main memory efficiently.",
        detail: "Includes paging, segmentation, virtual memory, and swapping."
      },
      {
        name: "Deadlock",
        desc: "Situation where processes wait indefinitely.",
        detail: "Conditions: mutual exclusion, hold & wait, no preemption, circular wait."
      },
      {
        name: "File System",
        desc: "Manages data storage on disk.",
        detail: "Handles file creation, deletion, organization, and access."
      }
    ]
  },

  CN: {
    title: "Computer Networks",
    youtube: "https://www.youtube.com/embed/IPvYjXCsTg8",
    concepts: [
      {
        name: "OSI Model",
        desc: "7-layer conceptual model for communication.",
        detail: "Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application."
      },
      {
        name: "TCP/IP",
        desc: "Protocol suite for internet communication.",
        detail: "Includes protocols like TCP, UDP, IP, HTTP, FTP."
      },
      {
        name: "Routing",
        desc: "Process of selecting paths in a network.",
        detail: "Routing algorithms include Distance Vector and Link State."
      },
      {
        name: "IP Addressing",
        desc: "Unique identification for devices on a network.",
        detail: "Includes IPv4 and IPv6 addressing formats."
      },
      {
        name: "Network Security",
        desc: "Protecting data during transmission.",
        detail: "Includes encryption, firewalls, VPNs, and authentication."
      }
    ]
  }
};

  // =========================
  // SHOW ONLY SELECTED SUBJECT
  // =========================
  if (!subject || !subjectsData[subject]) {
    subjectTitle.innerText = "No Subject Found";
    return;
  }

  const data = subjectsData[subject];

  if (data) {
    subjectTitle.innerText = data.title;

    // INJECT YOUTUBE IFRAME
    if (data.youtube) {
        let ytDiv = document.createElement("div");
        ytDiv.style.marginBottom = "30px";
        ytDiv.style.textAlign = "center";
        ytDiv.style.gridColumn = "1 / -1"; // Span full width for grid
        ytDiv.innerHTML = `<iframe width="100%" height="400" src="${data.youtube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius:15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.1);"></iframe>`;
        container.appendChild(ytDiv);
    }

    // CREATE CARDS
    data.concepts.forEach(concept => {

      let div = document.createElement("div");
      div.classList.add("subject-box");

      div.innerHTML = `
        <h3>${concept.name}</h3>
        <p style="color:#e0b3ff">${concept.desc}</p>
        <p>${concept.detail}</p>
      `;

      container.appendChild(div);
    });
  }

  // FETCH NATIVE USER NOTES
  async function loadUserNotes() {
    try {
      const token = localStorage.getItem("token");
      if(token) {
          // let's fetch ALL notes generic by just grabbing from whatever chapter we can or assuming the API was updated
          const backendRes = await fetchWithAuth(`/notes/All/General`); 
          if(backendRes && backendRes.ok) {
              const backendNotes = await backendRes.json();
              backendNotes.forEach(userNote => {
                  let div = document.createElement("div");
                  div.classList.add("subject-box");
                  div.style.borderTop = "3px solid #5eff5e";
                  div.innerHTML = `
                  <h3>[My Note] ${userNote.title}</h3>
                  <p><b>Chapter:</b> ${userNote.chapter}</p>
                  <p>${userNote.content}</p>
                  `;
                  container.prepend(div);
              });
          }
      }
    } catch(err) {
       console.error("Error fetching native notes", err);
    }
  }

  await loadUserNotes();

  // CREATE NOTE LOGIC
  const createNoteForm = document.getElementById("createNoteForm");
  if (createNoteForm) {
    createNoteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const fullContent = document.getElementById("noteContent").value.trim();
      
      // Auto-extract title from first 4 words of the note
      const words = fullContent.split(" ");
      const generatedTitle = words.slice(0, 4).join(" ") + (words.length > 4 ? "..." : "");

      // Default to "General" if user hasn't selected a subject page yet
      const subjectInput = subject || "General";
      const chapterInput = "General";

      try {
        const res = await fetchWithAuth("/notes", {
          method: "POST",
          body: JSON.stringify({
            subject: subjectInput,
            chapter: chapterInput,
            title: generatedTitle,
            content: fullContent
          })
        });

        if (res && res.ok) {
          alert("Note Created successfully!");
          window.location.reload(); // Quick refresh to show new note
        } else {
          alert("Failed to create note");
        }
      } catch(err) {
        console.error(err);
        alert("Error creating note");
      }
    });
  }

});