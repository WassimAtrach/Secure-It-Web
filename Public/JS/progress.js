document.addEventListener('DOMContentLoaded', function() {
// פונקציה לפתיחה וסגירה של הטפסים (Toggle)
  window.toggleForm = function(formId) {
    const $target = $('#' + formId);
    
    if ($target.is(':visible')) {
      $target.slideUp();
    } else {
      // סגירת טפסים אחרים לפני פתיחת החדש
      $('.form-box').slideUp();
      $target.slideDown();
      // גלילה חלקה לטופס שנפתח
      $('html, body').animate({
        scrollTop: $target.offset().top - 100
      }, 500);
    }
  };

  // ===== HOME AUDIT FORM VALIDATIONS =====
  const auditForm = document.querySelector('#audit-form form');
  if (auditForm) {
    auditForm.addEventListener('submit', function(e) {
      const deviceName = auditForm.querySelector('input[name="d_name"]').value.trim();
      const osSelect = auditForm.querySelector('select[name="os_type"]');
      const osInput = osSelect.value;
      const auditDate = auditForm.querySelector('input[name="audit_date"]').value;
      
      // Validate device name (must contain at least one letter and be 2-50 chars)
      const hasLetter = /[a-zA-Z]/.test(deviceName);
      if (!deviceName || deviceName.length < 2 || deviceName.length > 50 || !hasLetter) {
        e.preventDefault();
        alert('❌ Device name must be 2-50 characters and contain at least one letter (cannot be only numbers).');
        return;
      }
      
      // Validate Date field (required)
      if (!auditDate) {
        e.preventDefault();
        alert('❌ Please select an Update Date.');
        return;
      }

      // Validate Date format (YYYY-MM-DD) to avoid server error page
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(auditDate) && !Number.isNaN(new Date(auditDate).getTime());
      if (!isValidDate) {
        e.preventDefault();
        alert('❌ Please enter a valid date.');
        return;
      }

      // Validate OS field (required)
      if (!osInput) {
        e.preventDefault();
        alert('❌ Please specify the operating system (e.g., Android, iOS, Windows).');
        return;
      }
    });
  }

  // ===== SAFETY GOALS FORM VALIDATIONS =====
  const goalsForm = document.querySelector('#goals-form form');
  if (goalsForm) {
    const categoryInput = goalsForm.querySelector('input[name="category"]');
    const targetDeviceInput = goalsForm.querySelector('input[name="target_device"]');

    if (categoryInput) {
      categoryInput.addEventListener('input', function () {
        if (/\d/.test(categoryInput.value)) {
          alert('❌ Numbers are not allowed in the category.');
          categoryInput.value = categoryInput.value.replace(/\d/g, '');
        }
      });
    }

    goalsForm.addEventListener('submit', function(e) {
      const category = goalsForm.querySelector('input[type="text"]').value.trim();
      const targetDevice = targetDeviceInput ? targetDeviceInput.value.trim() : '';
      const cost = goalsForm.querySelector('input[type="number"]').value;
      
      // Validate category (required, 3-30 chars)
      if (!category || category.length < 3 || category.length > 30) {
        e.preventDefault();
        alert('❌ Category must be between 3 and 30 characters.');
        return;
      }

      if (/\d/.test(category)) {
        e.preventDefault();
        alert('❌ Numbers are not allowed in the category.');
        return;
      }

      if (!targetDevice) {
        e.preventDefault();
        alert('❌ Target device is required.');
        return;
      }
      
      // Validate cost (must be number, 0-10000)
      if (isNaN(cost) || cost < 0 || cost > 10000) {
        e.preventDefault();
        alert('❌ Cost must be a number between 0 and 10000.');
        return;
      }
    });
  }

  // ===== TOOL RECOMMENDATION FORM VALIDATIONS =====
  const toolsForm = document.querySelector('#tools-form form');
  if (toolsForm) {
    toolsForm.addEventListener('submit', function(e) {
      const toolName = toolsForm.querySelector('input[type="text"]').value.trim();
      const priceModel = toolsForm.querySelector('input[type="number"]').value.trim();
      const rating = toolsForm.querySelector('input[name="rating"]:checked');
      const link = toolsForm.querySelector('input[type="text"]:last-of-type').value.trim();
      
      // Validate price model (required, must be number, no letters)
      if (!priceModel || isNaN(priceModel) || priceModel < 0) {
        e.preventDefault();
        alert('❌ Price model must be a valid number with no letters.');
        return;
      }
      
      // Validate rating (must select one)
      if (!rating) {
        e.preventDefault();
        alert('❌ Please select a rating between 1 and 5.');
        return;
      }
    });
  }

  // ===== View Full buttons (placeholder) =====
  const viewFullButtons = Array.from(document.querySelectorAll('button')).filter(btn => btn.textContent.trim().toLowerCase() === 'view full');
  viewFullButtons.forEach(btn => {
    btn.addEventListener('click', function(evt) {
      evt.preventDefault();
      alert('Sorry, this doesnt work yet');
    }, { once: true });
  });
  // ===== פונקציה להצגת היסטוריית פעילות דינמית =====
  function displayLogs() {
    const container = document.querySelector('#logs-preview-container');
    const noLogsMsg = document.querySelector('#no-logs-msg');
    
    // שליפת כל המפתחות ששמרנו בטפסים
    const keys = Object.keys(localStorage).filter(k => 
      k.startsWith('auditReport_') || k.startsWith('goal_') || k.startsWith('tool_')
    );

    if (keys.length > 0 && noLogsMsg) noLogsMsg.remove();
    container.innerHTML = keys.length === 0 ? '<p class="text-center muted">No logs found.</p>' : '';

    // מיון מהחדש לישן והצגה
    keys.sort().reverse().slice(0, 5).forEach(key => {
      const data = JSON.parse(localStorage.getItem(key));
      const logCard = document.createElement('article');
      
      let title = "", typeClass = "";
      if (key.startsWith('auditReport_')) { title = `Home Audit: ${data.device}`; typeClass = "audit-log"; }
      else if (key.startsWith('goal_')) { title = `Goal: ${data.category}`; typeClass = "goals-log"; }
      else { title = `Shared Tool: ${data.tool}`; typeClass = "tools-log"; }

      logCard.className = `content-card log-card ${typeClass}`;
      logCard.innerHTML = `
        <div class="log-header">
            <div>
                <h4 class="highlight">${title}</h4>
                <small class="muted">Submitted on ${data.date}</small>
            </div>
            <button class="cta-btn small view-btn">View Details</button>
        </div>
        <table class="log-details-table" style="display: none;">
            ${Object.entries(data).map(([k, v]) => `<tr><td>${k.charAt(0).toUpperCase() + k.slice(1)}:</td><td>${v}</td></tr>`).join('')}
        </table>
      `;

      // לוגיקת פתיחה/סגירה של הפירוט
      logCard.querySelector('.view-btn').onclick = function() {
        const table = this.parentElement.nextElementSibling;
        table.style.display = table.style.display === 'none' ? 'table' : 'none';
        this.textContent = table.style.display === 'none' ? 'View Details' : 'Close';
      };

      container.appendChild(logCard);
    });
  }

  displayLogs();
  
});
