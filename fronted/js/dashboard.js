document.addEventListener("DOMContentLoaded", async () => {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
        document.querySelector(".dashboard").innerHTML = "<h2>Please login to view dashboard</h2>";
        return;
    }

    const user = JSON.parse(userStr);
    const username = user.email ? user.email.split('@')[0] : "Student";
    
    // Update Username Greeting
    const usernameEl = document.getElementById("username");
    if(usernameEl) {
        usernameEl.innerHTML = `${username} <span style="font-size:18px; color:#ff6b2b; background: rgba(255,107,43,0.1); padding: 5px 12px; border-radius: 20px; vertical-align: middle; margin-left: 15px; border: 1px solid rgba(255,107,43,0.3); box-shadow: 0 0 10px rgba(255,107,43,0.2);">🔥 ${user.streakCount || 1} Day Streak</span>`;
    }

    try {
        const res = await fetchWithAuth("/dashboard");
        if (res && res.ok) {
            const data = await res.json();
            
            // Map Basic Counts directly to elements
            const notesEl = document.getElementById("notesCount");
            if(notesEl) notesEl.innerText = data.totalNotes || 0;

            const flashEl = document.getElementById("flashCount");
            if(flashEl) flashEl.innerText = data.totalFlashcards || 0;

            // Compute total distinct Revision Topics practiced
            const revisionEl = document.getElementById("revisionCount");
            if(revisionEl) revisionEl.innerText = data.progressSummary ? data.progressSummary.length : 0;

            // Create a custom section for Weak Topics and Detailed Analytics
            // Find the location right beneath the .stats div
            const statsContainer = document.querySelector(".stats");
            
            if(statsContainer) {
                let analyticsHTML = `<div class="analytics-panel" style="margin-top: 30px; margin-bottom: 30px;">`;
                
                if (data.weakTopics && data.weakTopics.length > 0) {
                    analyticsHTML += `
                      <h3 style="color: #ff4d4d; border-bottom: 1px solid #ff4d4d; padding-bottom: 5px;">⚠️ Needs Improvement</h3>
                      <ul style="list-style:none; padding-left:0;">
                    `;
                    data.weakTopics.forEach(t => {
                        analyticsHTML += `<li style="background: rgba(255,255,255,0.1); padding: 10px; margin-bottom: 5px; border-radius: 5px;">
                        <b>Subject: ${t.subject}</b> | <span style="color:#66ffb3">Correct: ${t.correctAnswers}</span> | <span style="color:#ff66b3">Wrong: ${t.wrongAnswers}</span>
                        </li>`;
                    });
                    analyticsHTML += `</ul>`;
                }

                if (data.progressSummary && data.progressSummary.length > 0) {
                    analyticsHTML += `
                      <h3 style="color: #66ffb3; border-bottom: 1px solid #66ffb3; padding-bottom: 5px; margin-top: 20px;">📊 Personal Performance Matrix</h3>
                      <ul style="list-style:none; padding-left:0;">
                    `;
                    data.progressSummary.forEach(p => {
                        const acc = (p.total > 0) ? Math.round((p.correct / p.total) * 100) : 0;
                        analyticsHTML += `<li style="background: rgba(255,255,255,0.1); padding: 10px; margin-bottom: 5px; border-radius: 5px;">
                        <b>${p.subject}</b> - Accuracy: ${acc}% <span style="font-size:12px; color:#cfc3d9;">(${p.correct} out of ${p.total})</span>
                        </li>`;
                    });
                    analyticsHTML += `</ul>`;
                }

                if (data.notesOverview && Object.keys(data.notesOverview).length > 0) {
                    analyticsHTML += `
                      <h3 style="color: #b366ff; border-bottom: 1px solid #b366ff; padding-bottom: 5px; margin-top: 30px;">📚 My Notes Bookshelf</h3>
                      <div class="dashboard-notes-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-top: 15px;">
                    `;

                    for (const [subject, notesArr] of Object.entries(data.notesOverview)) {
                        analyticsHTML += `
                        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 15px;">
                            <h4 style="color: #e0b3ff; margin-top:0; margin-bottom:15px; font-size:18px;">${subject} <span style="font-size:12px; opacity:0.7">(${notesArr.length})</span></h4>
                            <ul style="list-style:none; padding-left:0; max-height:200px; overflow-y:auto; overflow-x:hidden;">
                        `;
                        
                        notesArr.forEach(n => {
                            analyticsHTML += `
                            <li style="margin-bottom:10px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;">
                                <strong>${n.title}</strong>
                                <p style="font-size:12px; margin:5px 0 0 0; color:#cfc3d9; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${n.content}</p>
                            </li>`;
                        });

                        analyticsHTML += `</ul></div>`;
                    }
                    analyticsHTML += `</div>`;
                }

                analyticsHTML += `</div>`;

                // Inject Custom Analytics Below standard stats
                statsContainer.insertAdjacentHTML('afterend', analyticsHTML);
            }

        }
    } catch(e) {
        console.error("Dashboard fetch error:", e);
    }
});