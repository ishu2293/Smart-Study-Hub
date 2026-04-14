document.addEventListener("DOMContentLoaded", () => {
    // 1. Accordion logic
    const headers = document.querySelectorAll('.dsa-card-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            // Find the table wrapper and the chevron icon inside the card
            const wrapper = header.nextElementSibling;
            const chevron = header.querySelector('.fa-chevron-up');

            // Toggle the 'collapsed' class
            if (wrapper) wrapper.classList.toggle('collapsed');
            if (chevron) chevron.classList.toggle('collapsed');
        });
    });

    // 2. Progress Tracking Logic
    let solvedDsa = JSON.parse(localStorage.getItem('solved_dsa_questions')) || [];
    
    // Function to calculate and update X/Y for each card
    function updateCardProgress() {
        const cards = document.querySelectorAll('.dsa-card');
        cards.forEach(card => {
            const tableRows = card.querySelectorAll('tbody tr');
            const totalProblems = tableRows.length;
            let solvedInCard = 0;

            tableRows.forEach(row => {
                const titleNode = row.querySelector('td:nth-child(2)');
                if (titleNode) {
                    const title = titleNode.innerText.trim();
                    if (solvedDsa.includes(title)) {
                        solvedInCard++;
                    }
                }
            });

            // Update the span that shows '0/6' etc.
            const progressSpan = card.querySelector('.dsa-progress span');
            if (progressSpan) {
                progressSpan.innerText = `${solvedInCard}/${totalProblems}`;
            }
        });
    }

    // Apply solved state to all circles on load
    const circles = document.querySelectorAll('tbody .circle-outline');
    circles.forEach(circle => {
        const row = circle.closest('tr');
        if (!row) return;
        
        const titleNode = row.querySelector('td:nth-child(2)');
        if (!titleNode) return;
        
        const title = titleNode.innerText.trim();
        
        // Initialize state
        if (solvedDsa.includes(title)) {
            circle.classList.add('completed');
        }

        // Add Click Listener
        circle.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent accordion from toggling if clicked inside header (though circles are in tbody)
            
            circle.classList.toggle('completed');
            
            if (circle.classList.contains('completed')) {
                if (!solvedDsa.includes(title)) {
                    solvedDsa.push(title);
                }
            } else {
                solvedDsa = solvedDsa.filter(item => item !== title);
            }
            
            localStorage.setItem('solved_dsa_questions', JSON.stringify(solvedDsa));
            updateCardProgress();
        });
    });

    // Initial card progress update
    updateCardProgress();
});
