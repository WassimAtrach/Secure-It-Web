document.addEventListener("DOMContentLoaded", () => {
    const lessonListSection = document.getElementById("lessonList");
    const lessonContentSection = document.getElementById("lessonContent");

    /* ================= LESSON DATA ================= */
    const lessons = {
        phishing: {
            title: "Phishing Attacks",
            intro: `
                <p style="margin-bottom: 16px;">
                Phishing is one of the most common and effective cyber attacks used to steal
                sensitive information by exploiting human trust rather than technical vulnerabilities.
                </p>
            `,
            sections: [
                {
                heading: "What is Phishing?",
                text: `
                    <p style="margin-bottom: 12px;">
                    Phishing is a type of social engineering attack where attackers impersonate
                    trusted organizations, companies, or individuals to trick victims into
                    revealing sensitive information. This information can include usernames,
                    passwords, credit card details, or personal identification data.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Phishing attacks rely heavily on deception and urgency to manipulate users
                    into acting quickly without thinking.
                    </p>
                `
                },
                {
                heading: "Why Phishing Works",
                text: `
                    <p style="margin-bottom: 12px;">
                    Phishing is effective because it targets human behavior rather than software weaknesses.
                    Attackers use fear, curiosity, urgency, or authority to pressure victims into clicking links
                    or sharing information.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Messages may claim an account is compromised, a payment failed, or a prize was won,
                    pushing users to react emotionally instead of logically.
                    </p>
                `
                },
                {
                heading: "Common Phishing Examples",
                text: `
                    <p style="margin-bottom: 12px;">
                    Phishing attacks often appear as emails, SMS messages (smishing), phone calls (vishing),
                    or fake websites. Common examples include:
                    </p>
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>Fake bank alerts asking you to verify your account</li>
                    <li>Delivery notifications with malicious links</li>
                    <li>Password reset emails you did not request</li>
                    <li>Social media messages pretending to be from friends or support teams</li>
                    </ul>
                `
                },
                {
                heading: "Phishing Techniques",
                text: `
                    <p style="margin-bottom: 12px;">
                    Attackers use techniques such as spoofed email addresses, lookalike domains, fake login pages,
                    and malicious attachments. Some phishing campaigns are broad, while others are highly targeted
                    (spear phishing) and use personal information to appear more convincing.
                    </p>
                `
                },
                {
                heading: "How to Spot Phishing",
                text: `
                    <p style="margin-bottom: 12px;">
                    Learning to recognize phishing attempts is one of the best ways to protect yourself. Common signs include:
                    </p>
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>Unexpected emails or messages asking for sensitive information like passwords or credit card numbers.</li>
                    <li>Generic greetings like "Dear Customer" instead of your real name.</li>
                    <li>Spelling or grammar mistakes in the email or website.</li>
                    <li>Suspicious URLs that look similar to real websites (e.g., "faceb00k.com").</li>
                    <li>Urgent or threatening messages pressuring you to act immediately.</li>
                    <li>Attachments or links you weren’t expecting, especially if they ask you to enable macros or download files.</li>
                    <li>Requests for personal information that legitimate organizations would never ask for via email.</li>
                    </ul>
                    <p style="margin-bottom: 12px;">
                    When in doubt, verify the sender by contacting the organization directly using official channels, and avoid clicking on suspicious links.
                    </p>
                `
                },
                {
                heading: "Potential Consequences",
                text: `
                    <p style="margin-bottom: 12px;">Successful phishing attacks can lead to:</p>
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>Stolen identities</li>
                    <li>Financial loss</li>
                    <li>Unauthorized access to accounts</li>
                    <li>Data breaches</li>
                    <li>Malware infections</li>
                    </ul>
                `
                }
            ]
        },
        password: {
            title: "Password Safety",
            intro: `
                <p style="margin-bottom: 16px;">
                Strong passwords are your first line of defense against cyber attacks.
                They help protect your personal data, online identity, and accounts from unauthorized access.
                </p>
            `,
            sections: [
                {
                heading: "Why Passwords Matter",
                text: `
                    <p style="margin-bottom: 12px;">
                    Passwords act as a barrier between your personal information and attackers.
                    Weak, short, or reused passwords make it easy for attackers to break into accounts
                    using techniques such as brute-force attacks, password guessing, or credential stuffing.
                    </p>
                    <p style="margin-bottom: 12px;">
                    If one account is compromised and the same password is reused elsewhere,
                    attackers can gain access to multiple services.
                    </p>
                `
                },
                {
                heading: "Common Password Threats",
                text: `
                    <p style="margin-bottom: 12px;">
                    Attackers use methods such as brute-force attacks, dictionary attacks, and data breaches
                    to obtain passwords. Leaked passwords from one website are often reused to try accessing other platforms.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Phishing attacks also trick users into willingly giving up their passwords
                    by impersonating trusted services.
                    </p>
                `
                },
                {
                heading: "Weak vs Strong Password Examples",
                text: `
                    <p style="margin-bottom: 12px;">Weak passwords are easy to guess, short, or commonly used. Examples include:</p>
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>password123</li>
                    <li>123456</li>
                    <li>qwerty</li>
                    <li>iloveyou</li>
                    <li>Using personal info like Sarah2004 or DavidBirthday</li>
                    </ul>
                    <p style="margin-bottom: 12px;">Strong passwords are long, unique, and unpredictable. Examples include:</p>
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>Blue$River!Candle92</li>
                    <li>CloudsDance#7AtNight</li>
                    <li>Sun_Moon_42!Star</li>
                    </ul>
                `
                },
                {
                heading: "Creating Strong Passwords",
                text: `
                    <p style="margin-bottom: 12px;">
                    Strong passwords should be long and complex, ideally 12 characters or more.
                    Use a mix of uppercase and lowercase letters, numbers, and symbols.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Avoid predictable patterns, common words, or personal information such as names, birthdays, or phone numbers.
                    Passphrases made of multiple unrelated words can be both strong and easier to remember.
                    </p>
                `
                },
                {
                heading: "Password Best Practices",
                text: `
                    <p style="margin-bottom: 12px;">
                    Use a unique password for every account to prevent one breach from spreading to others.
                    A password manager can help generate and store strong passwords securely.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Enable Two-Factor Authentication (2FA) whenever possible to add an extra layer of protection.
                    Change passwords immediately if you suspect an account has been compromised.
                    </p>
                `
                },
                {
                heading: "Common Mistakes to Avoid",
                text: `
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>Avoid writing passwords on paper or storing them in plain text files.</li>
                    <li>Do not share your passwords with others.</li>
                    <li>Do not reuse old passwords or make small variations of the same password.</li>
                    <li>Pay attention to security alerts and breach notifications to stay protected.</li>
                    </ul>
                `
                }
            ]
        },
        social: {
           title: "Social Engineering",
            intro: `
                <p style="margin-bottom: 16px;">
                Social engineering attacks target human psychology rather than technical vulnerabilities.
                Instead of hacking systems, attackers manipulate people into making mistakes that compromise security.
                </p>
            `,
            sections: [
                {
                heading: "What is Social Engineering?",
                text: `
                    <p style="margin-bottom: 12px;">
                    Social engineering is a type of attack where attackers manipulate individuals into performing actions
                    or revealing confidential information. By exploiting emotions such as trust, fear, curiosity, or urgency,
                    attackers convince victims to bypass normal security procedures.
                    </p>
                    <p style="margin-bottom: 12px;">
                    These attacks often feel legitimate and can happen both online and offline.
                    </p>
                `
                },
                {
                heading: "Why Social Engineering is Effective",
                text: `
                    <p style="margin-bottom: 12px;">
                    Social engineering works because humans naturally want to be helpful and avoid conflict or trouble.
                    Attackers create situations that feel urgent or authoritative, making victims act quickly without verifying details.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Even people with strong technical skills can fall victim if they are caught off guard.
                    </p>
                `
                },
                {
                heading: "Common Social Engineering Tactics",
                text: `
                    <p style="margin-bottom: 12px;">
                    Attackers may impersonate coworkers, IT support, managers, or trusted organizations. Common tactics include:
                    </p>
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>Pretending to fix an urgent technical issue</li>
                    <li>Requesting login credentials or one-time codes</li>
                    <li>Claiming there is a security emergency</li>
                    <li>Emails, phone calls, text messages, social media, or face-to-face interactions</li>
                    </ul>
                `
                },
                {
                heading: "Real-World Examples",
                text: `
                    <p style="margin-bottom: 12px;">
                    Examples of social engineering include:
                    </p>
                    <ul style="margin-left: 20px; margin-bottom: 12px;">
                    <li>A fake IT technician asking for your password to 'fix an issue'</li>
                    <li>An email pretending to be your boss requesting urgent information</li>
                    <li>A message claiming your account will be locked unless you act immediately</li>
                    <li>Tailgating: an attacker following someone into a secured building</li>
                    </ul>
                `
                },
                {
                heading: "How to Stay Safe",
                text: `
                    <p style="margin-bottom: 12px;">
                    To protect yourself, always verify the identity of anyone requesting sensitive information, even if they appear trustworthy.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Slow down and think when a message feels urgent or emotional. Never share passwords, verification codes, or personal details without confirmation.
                    </p>
                    <p style="margin-bottom: 12px;">
                    When in doubt, contact the person or organization through official and trusted channels.
                    </p>
                `
                }
            ]
        },
        browsing: {
            title: "Safe Browsing",
            intro: `
                <p style="margin-bottom: 16px;">
                Browsing the internet safely helps prevent malware infections, data theft, and unwanted tracking.
                The web has many useful resources, but attackers often hide threats in places that look harmless.
                </p>
            `,
            sections: [
                {
                heading: "Recognizing Fake Websites",
                text: `
                    <p style="margin-bottom: 12px;">
                    Fake websites are designed to look like legitimate ones to trick users into entering personal information.
                    They often use misspelled domain names (e.g., 'faceb00k.com' instead of 'facebook.com'), low‑quality design, broken links,
                    and suspicious pop‑ups.
                    </p>
                    <p style="margin-bottom: 12px;">
                    If something looks off or too good to be true, double‑check the URL and website details before interacting.
                    </p>
                `
                },
                {
                heading: "Secure Connections",
                text: `
                    <p style="margin-bottom: 12px;">
                    A secure website uses HTTPS instead of HTTP. HTTPS encrypts the information you send and receive, helping protect it from eavesdroppers.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Look for the lock icon in the browser’s address bar before entering sensitive data like passwords or credit card numbers.
                    If a site shows a warning about an insecure connection, avoid entering personal information.
                    </p>
                `
                },
                {
                heading: "Safe Download Habits",
                text: `
                    <p style="margin-bottom: 12px;">
                    Only download files from trusted and official sources, such as verified app stores or the official website of the software.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Avoid clicking on unknown ads, pop‑ups, or banners that promise free software, games, or prizes,
                    as these often lead to malware. If a download prompt appears unexpectedly, cancel it and navigate manually to the official site.
                    </p>
                `
                },
                {
                heading: "Beware of Suspicious Ads and Pop‑ups",
                text: `
                    <p style="margin-bottom: 12px;">
                    Attackers often use flashy ads or pop‑ups that warn you about fake viruses or prize winnings to get you to click and download harmful software.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Never click on pop‑ups that say your device is infected — legitimate security alerts come from your real antivirus software, not random pop‑ups.
                    </p>
                `
                },
                {
                heading: "Using Browser Security Tools",
                text: `
                    <p style="margin-bottom: 12px;">
                    Modern browsers include features like phishing protection, pop‑up blockers, and safety warnings. Keep your browser updated and enable security settings.
                    </p>
                    <p style="margin-bottom: 12px;">
                    Consider installing reputable extensions that block malicious websites or trackers. These tools add extra layers of protection while you browse.
                    </p>
                `
                }
            ]
        }
    };
    // Handle "Start Lesson" buttons
    document.querySelectorAll(".start-lesson").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Updated to match your HTML class: learn-lesson-card
            const card = e.target.closest(".learn-lesson-card");
            if (card) {
                const lessonKey = card.dataset.lesson;
                loadLesson(lessonKey);
            }
        });
    });

    // Handle "Start Quiz" buttons
    document.querySelectorAll(".quiz-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Updated to match your HTML class: learn-lesson-card
            const card = e.target.closest(".learn-lesson-card");
            if (card) {
                const lessonKey = card.dataset.lesson;
                
                if (lessonKey === "phishing") {
                    window.location.href = "quiz.html";
                } else {
                    // Get title dynamically or use fallback
                    const lessonTitle = lessons[lessonKey] ? lessons[lessonKey].title : "this topic";
                    alert("🚀 Coming Soon: We are currently finalizing the quiz for " + lessonTitle + ". Stay tuned!");
                }
            }
        });
    });

    /* ================= LOAD LESSON FUNCTION ================= */
    function loadLesson(key) {
        const lesson = lessons[key];
        if (!lesson) return;

        // Hide list, show content
        lessonListSection.style.display = "none";
        lessonContentSection.style.display = "block";
        window.scrollTo(0, 0); // Scroll to top

        // Map sections to HTML
        const sectionsHTML = lesson.sections.map(section => `
            <h3>${section.heading}</h3>
            <p>${section.text}</p>
        `).join('');

        lessonContentSection.innerHTML = `
            <div class="lesson-header">
                <h2>${lesson.title}</h2>
                <p class="intro">${lesson.intro}</p>
            </div>

            <article class="content-card">
                ${sectionsHTML}
            </article>

            <div class="lesson-footer">
                <button class="cta-btn" id="backBtn">← Back to Lessons</button>
            </div>
        `;

        // Back Button Listener
        document.getElementById("backBtn").addEventListener("click", () => {
            const backBtn = document.getElementById("backBtn");
            backBtn.innerHTML = '';
            backBtn.style = '';
            lessonContentSection.style.display = "none";
            lessonListSection.style.display = "block";
        });
    }
});