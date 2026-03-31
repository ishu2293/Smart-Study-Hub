document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");

  const subjectTitle = document.getElementById("subjectTitle");
  const container = document.getElementById("chapters");

  // SUBJECT DATA
  const subjectsData = {
  DSA: {
    title: "Data Structures & Algorithms",
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

  subjectTitle.innerText = data.title;

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

});