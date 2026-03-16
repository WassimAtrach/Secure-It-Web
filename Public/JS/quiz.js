document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('phishing-quiz');
    if (!form) return;

    // הגדרות תצוגת באדג'ים
    const badgeText = document.getElementById('phishingBadgeText');
    const quizCompleted = localStorage.getItem('quizCompleted') === 'true';
    const quizScore = localStorage.getItem('quizScore');

    if (badgeText) {
        badgeText.textContent = quizCompleted 
            ? `Completed the Phishing Quiz (${quizScore || '0'}/7)` 
            : 'Complete the Phishing Quiz to unlock.';
    }

    // פונקציית מניעת מספרים בשאלות הפתוחות
    function preventNumbersInput(inputEl, questionNum) {
        inputEl.addEventListener('input', function (e) {
            const filteredValue = e.target.value.replace(/\d/g, '');
            if (filteredValue !== e.target.value) {
                e.target.value = filteredValue;
                alert(`Please do not add numbers in your answer for question ${questionNum}.`);
            }
        });
    }

    const q6Input = form.querySelector('input[name="q6"]');
    const q7Input = form.querySelector('input[name="q7"]');
    if (q6Input) preventNumbersInput(q6Input, 6);
    if (q7Input) preventNumbersInput(q7Input, 7);

    let firstHintShown = false;

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

        // רמז ראשון ל-Q1
        const q1Selected = form.querySelector('input[name="q1"]:checked');
        if (!firstHintShown && q1Selected && q1Selected.value === 'yes') {
            alert('Hint: The answer is "No" because "Paypa1" is a classic phishing trick.');
            firstHintShown = true;
            return;
        }

        // חישוב ציון
        let score = 0;
        const correctAnswers = { q1: 'no', q2: 'no', q3: 'no', q4: 'yes', q5: 'yes' };
        
        for (let q in correctAnswers) {
            const selected = form.querySelector(`input[name="${q}"]:checked`);
            if (selected && selected.value === correctAnswers[q]) score++;
        }
        
        if (q6Input && q6Input.value.toLowerCase().includes('no')) score++;
        if (q7Input && q7Input.value.toLowerCase().includes('no')) score++;

        // יצירת תיבת התוצאות
        let resultBox = form.querySelector('.quiz-result');
        if (!resultBox) {
            resultBox = document.createElement('div');
            resultBox.className = 'content-card quiz-result';
            form.appendChild(resultBox);
        }

        // הצגת סטטוס ראשוני - ללא inline styling
        resultBox.innerHTML = `
            <h3>Quiz Results: ${score} / 7</h3>
            <p id="db-status">Saved to database</p>
        `;

        // שמירה ל-Local Storage
        localStorage.setItem('quizCompleted', score >= 5 ? 'true' : 'false');
        localStorage.setItem('quizScore', score);
        localStorage.setItem('quizDate', new Date().toLocaleDateString());

        // שליחה ל-PHP ב-Cpanel
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const statusText = document.getElementById('db-status');
            if (data.status === 'ok') {
                // הכיתוב כבר עודכן ב-innerHTML למעלה, כאן אנחנו מוודאים שהוא נשאר
                statusText.textContent = "Saved to database";
            } else {
                statusText.textContent = "Error saving to database";
            }
        })
        .catch(error => {
            console.error('Sync error:', error);
            const statusText = document.getElementById('db-status');
            if (statusText) {
                statusText.textContent = "Connection error. Could not save";
            }
        });

        // פידבק בסוף
        setTimeout(() => {
            const feedback = prompt('How was the Quiz?');
            if (feedback) localStorage.setItem('quizFeedback', feedback);
        }, 1500);
    });
});