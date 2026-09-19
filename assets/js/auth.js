/* ============================================================
   SPARKWASH — AUTH PAGE SCRIPTS
   Role switching, password visibility, and submit feedback
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Role selector tabs
  var tabDriver = document.getElementById('tab-driver');
  var tabFleet = document.getElementById('tab-fleet');
  var emailInput = document.getElementById('auth-email');

  if (tabDriver && tabFleet) {
    tabDriver.addEventListener('click', function () {
      tabDriver.classList.add('active');
      tabDriver.setAttribute('aria-selected', 'true');
      tabFleet.classList.remove('active');
      tabFleet.setAttribute('aria-selected', 'false');
      if (emailInput) emailInput.placeholder = 'name@example.com or +1 (555) 000-0000';
    });

    tabFleet.addEventListener('click', function () {
      tabFleet.classList.add('active');
      tabFleet.setAttribute('aria-selected', 'true');
      tabDriver.classList.remove('active');
      tabDriver.setAttribute('aria-selected', 'false');
      if (emailInput) emailInput.placeholder = 'fleet-id@company.com or Tax ID';
    });
  }

  // Password visibility toggle
  var pwdInput = document.getElementById('auth-password');
  var toggleBtn = document.getElementById('toggle-pwd-btn');
  if (pwdInput && toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var isPwd = pwdInput.type === 'password';
      pwdInput.type = isPwd ? 'text' : 'password';
      toggleBtn.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
      toggleBtn.innerHTML = isPwd ?
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true">' +
          '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>' +
          '<line x1="1" y1="1" x2="23" y2="23"/>' +
        '</svg>' :
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true">' +
          '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>' +
          '<circle cx="12" cy="12" r="3"/>' +
        '</svg>';
    });
  }

  // Form submission feedback
  var form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById('submit-btn');
      var originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Verifying credentials...</span>';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        alert('Welcome back to SparkWash! Account authenticated successfully.');
      }, 900);
    });
  }
});
