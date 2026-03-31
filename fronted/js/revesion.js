const topics = [
  "Binary Search",
  "SQL Joins",
  "Process Scheduling",
  "OSI Model"
];

const container = document.getElementById("revisionTopics");

if (container) {
  topics.forEach(topic => {
    const div = document.createElement("div");
    div.innerText = topic;
    div.classList.add("subject-card");
    container.appendChild(div);
  });
}