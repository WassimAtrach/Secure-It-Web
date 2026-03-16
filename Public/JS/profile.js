document.addEventListener('DOMContentLoaded', function () {
    // 1. Fetch Current Session Data
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');

    // 2. If localStorage session is missing, skip client-only updates
    if (!email) {
        console.log("No localStorage session found. Skipping client-side profile sync.");
    }

    // 3. Update Name and Email Display
    const emailElement = document.getElementById('userEmail');
    const nameElement = document.getElementById('userName');

    if (emailElement) emailElement.textContent = email;
    if (nameElement) nameElement.textContent = name;

    // 4. Progress Tracking Logic (equal weights)
    const progressData = {
        videos: [
            { key: 'video_what_is_phishing?', name: 'Phishing Video' },
            { key: 'video_why_is_it_important_to_create_a_strong_password?', name: 'Password Video' },
            { key: 'video_cybersecurity_awareness', name: 'Cybersecurity Video' }
        ],
        sites: [
            { key: 'site_tryhackme', name: 'TryHackMe' },
            { key: 'site_w3schools:_cybersecurity_101', name: 'W3Schools Cybersecurity' }
        ]
    };

    function updateProgressDisplay() {
        const tracker = document.querySelector('.progress-tracker');
        const auditsCount = tracker ? Number(tracker.dataset.audits) || 0 : 0;
        const goalsCount = tracker ? Number(tracker.dataset.goals) || 0 : 0;
        const toolsCount = tracker ? Number(tracker.dataset.tools) || 0 : 0;

        let completed = [];
        let remaining = [];

        const hasAudit = auditsCount > 0;
        const hasGoal = goalsCount > 0;
        const hasTool = toolsCount > 0;

        const allVideos = progressData.videos.every(v => localStorage.getItem(v.key) === 'watched');
        const allSites = progressData.sites.every(s => localStorage.getItem(s.key) === 'visited');
        const resourcesComplete = allVideos && allSites;

        if (hasAudit) {
            completed.push('✓ Audit submitted');
        } else {
            remaining.push('○ Submit an audit');
        }

        if (hasGoal) {
            completed.push('✓ Goal created');
        } else {
            remaining.push('○ Create a goal');
        }

        if (hasTool) {
            completed.push('✓ Tool shared');
        } else {
            remaining.push('○ Share a tool');
        }

        if (resourcesComplete) {
            completed.push('✓ Resources completed');
        } else {
            remaining.push('○ Complete all resources');
        }

        const quizPassed = localStorage.getItem('quizCompleted') === 'true';
        if (quizPassed) {
            const score = localStorage.getItem('quizScore') || '0';
            completed.push(`✓ Phishing Quiz (${score}/7)`);
        } else {
            remaining.push('○ Pass the Phishing Quiz');
        }

        const totalItems = 5;
        const completedItems = [hasAudit, hasGoal, hasTool, resourcesComplete, quizPassed]
            .filter(Boolean).length;
        const percentage = Math.round((completedItems / totalItems) * 100);
        const progressBar = document.querySelector('.progress-bar');
        const progressPercent = document.querySelector('.progress-percent');
        const progressDetails = document.getElementById('progressDetails');
        const resourcesChecklist = document.getElementById('resourcesChecklist');

        if (progressBar) progressBar.style.width = percentage + '%';
        if (progressPercent) progressPercent.textContent = percentage + '%';
        
        if (progressDetails) {
            progressDetails.innerHTML = `
                <strong>Completed:</strong><br>
                ${completed.length > 0 ? completed.join('<br>') : '<span class="no-items-completed">No items completed</span>'}<br><br>
                <strong>To Reach 100%:</strong><br>
                ${remaining.length > 0 ? remaining.join('<br>') : '<span class="all-items-completed">🎉 All items completed!</span>'}
            `;
        }

        if (resourcesChecklist) {
            resourcesChecklist.checked = resourcesComplete;
        }
    }

    updateProgressDisplay();

    const feedbackCard = document.getElementById('quizFeedbackCard');
    const feedbackText = document.getElementById('quizFeedbackText');
    const feedbackDate = document.getElementById('quizFeedbackDate');
    const savedFeedback = localStorage.getItem('quizFeedback');
    const savedFeedbackDate = localStorage.getItem('quizFeedbackDate');

    if (feedbackCard && feedbackText) {
        if (savedFeedback && savedFeedback.trim()) {
            feedbackText.textContent = savedFeedback;
            if (feedbackDate) {
                feedbackDate.textContent = savedFeedbackDate ? `Submitted on ${savedFeedbackDate}` : '';
            }
            feedbackCard.classList.remove('is-hidden');
        } else {
            feedbackCard.classList.add('is-hidden');
        }
    }

    // Export Data Button
    $('#exportBtn').on('click', function(evt) {
        evt.preventDefault();
        const $button = $(this);
        const $message = $('#exportMessage');
        $button.fadeOut(200, function () {
            $message.fadeIn(200).removeClass('is-hidden');
        });
    });
});