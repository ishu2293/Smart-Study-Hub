document.addEventListener("DOMContentLoaded", async () => {

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
        detail: "Arrays provide O(1) access time using an index, making them extremely fast for read operations. They are widely used for storing ordered data. However, their size is fixed upon creation in many languages, and insertion or deletion operations can be costly (O(n) time complexity) because elements must be shifted. Multidimensional arrays are used to represent matrices and grids.",
        youtube: "https://www.youtube.com/embed/VTLCoHnyACE"
      },
      {
        name: "Linked Lists",
        desc: "A linear data structure where elements are connected using pointers.",
        detail: "Unlike arrays, linked lists do not require contiguous memory allocations. Each element (node) contains both the data and a reference (or pointer) to the next node in the sequence. This dynamic nature allows for efficient O(1) insertions and deletions if the position is known. However, random access is not possible, meaning you must traverse the list sequentially (O(n)) to find an element. Types include singly, doubly, and circular linked lists.",
        youtube: "https://www.youtube.com/embed/LyuuqCVkP5I"
      },
      {
        name: "Stacks",
        desc: "A linear data structure following LIFO (Last In First Out).",
        detail: "In a stack, the last element added is the first one to be removed. Key operations include push (adding an element), pop (removing the top element), and peek (viewing the top element without removing it). Stacks are fundamentally used in managing function calls (recursion), implementing undo operations in text editors, and evaluating mathematical expressions.",
        youtube: "https://www.youtube.com/embed/0X-fV-1ir9c"
      },
      {
        name: "Queues",
        desc: "A linear structure following FIFO (First In First Out).",
        detail: "In a queue, the first element added is the first to be removed, much like a line of people waiting. Core operations are enqueue (add to back) and dequeue (remove from front). Queues are extensively used in CPU task scheduling, handling asynchronous requests, buffering data streams, and breadth-first search (BFS) graph traversal. Advanced variants include circular queues, priority queues, and double-ended queues (deque).",
        youtube: "https://www.youtube.com/embed/W7uB9-TKfTg"
      },
      {
        name: "Binary Search",
        desc: "An efficient algorithm to search for an item in a sorted array.",
        detail: "Binary search drastically reduces search time by repeatedly dividing the search interval in half. If the target value is less than the middle element, the search continues in the lower half, otherwise in the upper half. This results in an O(log n) time complexity, making it vastly superior to linear search for large datasets. It critically requires the input data to be sorted beforehand.",
        youtube: "https://www.youtube.com/embed/TbbSJrY5GqQ"
      },
      {
        name: "Hash Tables",
        desc: "A structure that maps keys to values using a hash function.",
        detail: "Hash tables offer lightning-fast data retrieval, providing O(1) average time complexity for insert, search, and delete operations. A hash function computes an index into an array of buckets or slots, from which the desired value can be found. When two keys hash to the same index, a 'collision' occurs. Collisions are handled using techniques like chaining (linked lists at each index) or open addressing.",
        youtube: "https://www.youtube.com/embed/WeF3_nk-UqY"
      }
    ]
  },

  DBMS: {
    title: "Database Management Systems",
    concepts: [
      {
        name: "SQL",
        desc: "Structured Query Language used to interact with relational databases.",
        detail: "SQL is the standard language for relational database management systems. It is used for creating schemas, reading, updating, and deleting data (CRUD operations). Core commands are categorized into DDL (Data Definition Language - CREATE, ALTER, DROP), DML (Data Manipulation Language - SELECT, INSERT, UPDATE, DELETE), and DCL (Data Control Language - GRANT, REVOKE).",
        youtube: "https://www.youtube.com/embed/HXV3zeQKqGY"
      },
      {
        name: "Normalization",
        desc: "Process of organizing data to reduce redundancy and improve integrity.",
        detail: "Normalization systematically divides larger tables into smaller, logically related ones and links them using relationships (foreign keys). The goal is to eliminate data anomalies during inserts, updates, and deletes. Common normal forms include 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), and BCNF.",
        youtube: "https://www.youtube.com/embed/GFQaEYEc8_8"
      },
      {
        name: "Transactions",
        desc: "A sequence of database operations treated as a single, logical unit of work.",
        detail: "Transactions ensure data remains in a consistent state even in the event of system failures. They must strictly follow ACID properties: Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don't interfere), and Durability (committed changes are permanent).",
        youtube: "https://www.youtube.com/embed/a8E6g7yBw4g"
      },
      {
        name: "Indexing",
        desc: "A data structure technique to significantly improve database query performance.",
        detail: "Indexes operate similarly to a book's index, allowing the database engine to quickly locate rows without scanning the entire table (full table scan). While they vastly speed up read operations (SELECT), they introduce overhead for write operations (INSERT, UPDATE, DELETE) because the index must also be updated. Types include B-tree, hash, primary, and secondary indexes.",
        youtube: "https://www.youtube.com/embed/fsG1XaZEa78"
      },
      {
        name: "ER Model",
        desc: "Entity-Relationship model, a conceptual blueprint for database design.",
        detail: "The ER model visually represents the data architecture of a system. It consists of Entities (real-world objects like 'Student' or 'Course'), Attributes (properties of entities like 'Name' or 'ID'), and Relationships (how entities interact, e.g., a student 'Enrolls' in a course). This abstraction is crucial before creating actual physical database schemas.",
        youtube: "https://www.youtube.com/embed/c0_9Y8QAstg"
      }
    ]
  },

  OS: {
    title: "Operating Systems",
    concepts: [
      {
        name: "Process Management",
        desc: "The OS's handling of active programs executing in memory.",
        detail: "A process is a program in execution. The OS is responsible for process creation, scheduling them on the CPU, synchronization, communication (IPC), and eventual termination. It maintains a Process Control Block (PCB) for each process to track its state, program counter, CPU registers, and memory allocations.",
        youtube: "https://www.youtube.com/embed/OrM7nZcxXZU"
      },
      {
        name: "CPU Scheduling",
        desc: "The method by which the OS decides which process runs next on the CPU.",
        detail: "To maximize CPU utilization and ensure fairness, the OS uses various scheduling algorithms. First-Come, First-Served (FCFS) is simple but can cause the 'convoy effect'. Shortest Job First (SJF) minimizes average waiting time. Round Robin (RR) allocates a fixed time quantum to each process, ideal for time-sharing systems. Priority Scheduling executes based on assigned importance.",
        youtube: "https://www.youtube.com/embed/ewLnyA9xAho"
      },
      {
        name: "Memory Management",
        desc: "The process of controlling and coordinating computer memory efficiently.",
        detail: "The OS must allocate memory to processes and reclaim it when they finish. Key techniques include Paging (dividing memory into fixed-size blocks to avoid external fragmentation) and Segmentation (dividing into variable-size logical segments). Virtual Memory allows execution of processes larger than physical RAM by swapping data between RAM and disk storage.",
        youtube: "https://www.youtube.com/embed/qcBIvnQtOkc"
      },
      {
        name: "Deadlock",
        desc: "A critical situation where a set of processes are blocked indefinitely.",
        detail: "A deadlock occurs when processes are stuck waiting for resources held by each other, forming a cycle. For a deadlock to happen, four Coffman conditions must hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Operating systems must implement strategies for deadlock prevention, avoidance, detection, or recovery.",
        youtube: "https://www.youtube.com/embed/rGQ-kAAma_I"
      },
      {
        name: "File System",
        desc: "The mechanism that manages data storage, retrieval, and organization on disk.",
        detail: "The file system abstracts physical storage into logical files and directories. It manages metadata (permissions, timestamps, size), handles file creation and deletion, and maps logical file blocks to physical disk sectors. Common file systems include NTFS, FAT32, ext4, and APFS. It also implements access control and security mechanisms.",
        youtube: "https://www.youtube.com/embed/9BqI5wLd2t4"
      }
    ]
  },

  CN: {
    title: "Computer Networks",
    concepts: [
      {
        name: "OSI Model",
        desc: "A 7-layer conceptual framework for understanding network communication.",
        detail: "The Open Systems Interconnection model standardizes communication functions. From bottom to top: Physical (cables/bits), Data Link (MAC addresses/frames), Network (IP addresses/routing), Transport (TCP/UDP ports), Session (managing connections), Presentation (encryption/formatting), and Application (HTTP/FTP). It helps in isolating network issues and standardizing hardware/software.",
        youtube: "https://www.youtube.com/embed/vv4y_uOneC0"
      },
      {
        name: "TCP/IP",
        desc: "The foundational protocol suite for the modern Internet.",
        detail: "Unlike the 7-layer OSI model, TCP/IP uses a more practical 4-layer approach: Network Access, Internet (IP), Transport (TCP/UDP), and Application. TCP (Transmission Control Protocol) ensures reliable, ordered, and error-checked delivery of data, while IP (Internet Protocol) handles the routing of packets across network boundaries.",
        youtube: "https://www.youtube.com/embed/PpsEaqJV_A0"
      },
      {
        name: "Routing",
        desc: "The process of selecting optimal paths for data packets across a network.",
        detail: "Routers use algorithms to determine the best path to forward packets toward their destination. Distance Vector routing (like RIP) shares routing tables with immediate neighbors, while Link State routing (like OSPF) builds a complete topological map of the network to calculate the shortest path. Routing is fundamental to the interconnected nature of the internet.",
        youtube: "https://www.youtube.com/embed/EabCNhoJwc0"
      },
      {
        name: "IP Addressing",
        desc: "Providing a unique numerical identifier to every device on a network.",
        detail: "An IP address allows devices to locate and communicate with each other. IPv4 uses a 32-bit format (e.g., 192.168.1.1), providing about 4.3 billion addresses, which are now depleted. IPv6 uses a 128-bit format, offering a virtually inexhaustible supply of addresses. Subnetting is used to divide networks into smaller, more efficient sub-networks.",
        youtube: "https://www.youtube.com/embed/VCziKMLEt_Q"
      },
      {
        name: "Network Security",
        desc: "Measures taken to protect data and network infrastructure from unauthorized access.",
        detail: "Network security encompasses various technologies and practices. Firewalls monitor and control incoming/outgoing traffic based on security rules. Encryption secures data in transit (like TLS/SSL for HTTPS). Virtual Private Networks (VPNs) create secure tunnels over public networks. Intrusion Detection Systems (IDS) monitor for malicious activities or policy violations.",
        youtube: "https://www.youtube.com/embed/inWWh25bCEo"
      }
    ]
  },

  SE: {
    title: "Software Engineering",
    concepts: [
      {
        name: "SDLC",
        desc: "Software Development Life Cycle, a structured framework for building software.",
        detail: "The SDLC outlines the standard phases a software project goes through to ensure quality and correctness. Typical phases include Requirement Analysis, System Design, Implementation (Coding), Testing, Deployment, and Maintenance. Traditional models like Waterfall treat these sequentially, while modern models are iterative.",
        youtube: "https://www.youtube.com/embed/i_oGkEwXWws"
      },
      {
        name: "Agile Methodology",
        desc: "An iterative and highly flexible approach to software development.",
        detail: "Agile prioritizes customer collaboration, working software, and adapting to change over rigid planning and extensive documentation. It involves breaking work into small, manageable increments called 'sprints' (often 2-4 weeks long). Popular frameworks implementing Agile principles include Scrum and Kanban.",
        youtube: "https://www.youtube.com/embed/Z9QbYZh1YCE"
      },
      {
        name: "UML Diagrams",
        desc: "Unified Modeling Language, a standardized visual language for system design.",
        detail: "UML helps architects and developers visualize, specify, construct, and document the artifacts of a software system. Structural diagrams (like Class and Component diagrams) show the static structure, while Behavioral diagrams (like Use Case, Sequence, and Activity diagrams) illustrate the dynamic behavior and interactions within the system.",
        youtube: "https://www.youtube.com/embed/UI6lqHOVHic"
      },
      {
        name: "Testing Strategies",
        desc: "Comprehensive methods to evaluate software quality and identify defects.",
        detail: "Testing occurs at multiple levels. Unit Testing isolates and verifies individual components. Integration Testing checks how modules work together. System Testing evaluates the complete, integrated system against requirements. Black Box testing focuses on input/output behavior without knowing internal code, while White Box testing examines internal logic and structure.",
        youtube: "https://www.youtube.com/embed/1iQzN9a60e0"
      },
      {
        name: "Design Patterns",
        desc: "Standardized, reusable solutions to commonly occurring software design problems.",
        detail: "Design patterns are not finished code, but templates for solving issues in specific contexts. They are categorized into Creational (e.g., Singleton for a single instance, Factory Method), Structural (e.g., Adapter to make incompatible interfaces work, Decorator), and Behavioral (e.g., Observer for pub/sub, Strategy for interchangeable algorithms).",
        youtube: "https://www.youtube.com/embed/tv-_1er1mWI"
      }
    ]
  },

  WAD: {
    title: "Web Application Development",
    concepts: [
      {
        name: "HTML5 & CSS3",
        desc: "The core declarative languages used to structure and style the modern Web.",
        detail: "HTML5 provides the semantic skeleton of a web page, introducing elements like <article>, <section>, and <nav> for better accessibility and SEO. CSS3 handles the presentation layer, offering powerful layout modules like Flexbox and CSS Grid, responsive design via media queries, and visual enhancements like transitions, animations, and custom variables.",
        youtube: "https://www.youtube.com/embed/mU6anWqZJcc"
      },
      {
        name: "JavaScript and DOM",
        desc: "The programming language that drives interactive and dynamic web behavior.",
        detail: "JavaScript executes in the browser and allows developers to programmatically alter the Document Object Model (DOM) - the tree-like representation of the HTML. It handles user events (clicks, input), manages state, and facilitates asynchronous operations (AJAX/Fetch) to communicate with servers without requiring a full page reload.",
        youtube: "https://www.youtube.com/embed/0ik6X4DJKCc"
      },
      {
        name: "RESTful APIs",
        desc: "Representational State Transfer, a standard architecture for networked applications.",
        detail: "REST APIs allow decoupled frontend applications to communicate with backend servers. They rely on stateless, client-server communication using standard HTTP methods: GET (read), POST (create), PUT/PATCH (update), and DELETE. Data is typically exchanged in JSON format, making it lightweight and easy to parse across different platforms.",
        youtube: "https://www.youtube.com/embed/lsMQRaeKNDk"
      },
      {
        name: "Frontend SPA Frameworks",
        desc: "Frameworks for building complex Single Page Applications.",
        detail: "Libraries and frameworks like React, Vue.js, and Angular revolutionize web development by allowing developers to build encapsulated, reusable UI components. SPAs load a single HTML document and dynamically update the content as the user interacts, providing a fast, fluid, desktop-like user experience powered by a Virtual DOM or reactive data binding.",
        youtube: "https://www.youtube.com/embed/NtaqKsE4KGI"
      },
      {
        name: "Authentication & Security",
        desc: "Crucial mechanisms to verify user identity and protect sensitive application data.",
        detail: "Web security involves verifying who a user is (Authentication) and what they can do (Authorization). Modern apps often use JSON Web Tokens (JWT) for stateless authentication. Security practices must defend against common vulnerabilities like Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and SQL Injection, while enforcing HTTPS.",
        youtube: "https://www.youtube.com/embed/71gcofP1SjM"
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

    // CREATE CARDS
    data.concepts.forEach(concept => {

      let div = document.createElement("div");
      div.classList.add("subject-box");
      div.style.display = "flex";
      div.style.flexDirection = "column";
      div.style.gap = "15px";

      let ytHtml = "";
      if (concept.youtube) {
        let vidId = "";
        const match = concept.youtube.match(/(?:embed\/|v=)([^?&]+)/);
        if (match) vidId = match[1];

        if (vidId) {
          const coverUrl = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
          const watchUrl = `https://www.youtube.com/watch?v=${vidId}`;
          ytHtml = `
            <div style="width: 100%; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.2); margin-top: 10px; position: relative; background: #000;">
              <a href="${watchUrl}" target="_blank" style="display: block; position: relative; text-decoration: none;">
                <img src="${coverUrl}" alt="Video Cover" style="width: 100%; height: 250px; object-fit: cover; opacity: 0.8; transition: 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,0,0,0.9); border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                  <div style="width: 0; height: 0; border-top: 15px solid transparent; border-bottom: 15px solid transparent; border-left: 20px solid white; margin-left: 6px;"></div>
                </div>
              </a>
            </div>
          `;
        }
      }

      div.innerHTML = `
        <h3 style="margin-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">${concept.name}</h3>
        <p style="color:#e0b3ff; font-weight: 500; font-size: 1.05rem;">${concept.desc}</p>
        <p style="line-height: 1.6; color: #ccc;">${concept.detail}</p>
        ${ytHtml}
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
                  container.appendChild(div);
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