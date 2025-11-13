/* =====================================================
   GRADIENT LOGIN FORM - VALIDATION & FORM LOGIC
   ===================================================== */

// Global variables to store validated user input
let verifiedEmail;     // Stores valid email after verification
let strongPass;        // Stores valid password after verification

// DOM element references
const emailInput = document.getElementById('e-input');         // Email input field
const passwInput = document.getElementById('p-input');         // Password input field
const emailLabel = document.getElementById('e-label');         // Email label element
const passLabel = document.getElementById('p-label');          // Password label element

// Store original label text for reset purposes
const eLabelText = emailLabel.textContent;

/* =====================================================
   EMAIL VALIDATION
   ===================================================== */

/**
 * Email validation on blur (when user leaves the input field)
 * - Validates email format using regex
 * - Updates label and applies error styling if invalid
 * - Stores verified email in global variable
 */
emailInput.onblur = (e) => {
  const email = e.target.value;
  // Regex pattern: checks for word characters @ word characters . word characters
  // Example: user@domain.com
  const emailRegex = /^\w+\@\w+\.\w+$/;
  
  if (email === '') {
    // Clear field: reset to original label
    emailLabel.textContent = eLabelText;
    if (emailLabel.classList.contains('inv-label')) {
      emailLabel.classList.remove('inv-label');
      e.target.classList.remove('inv-input');
    }
  } else if (emailRegex.test(email)) {
    // Valid email: show success state
    emailLabel.textContent = 'Email';
    if (emailLabel.classList.contains('inv-label')) {
      emailLabel.classList.remove('inv-label');
      e.target.classList.remove('inv-input');
    }
    // Store the verified email
    verifiedEmail = email;
  } else {
    // Invalid email: show error state
    emailLabel.textContent = 'Invalid email';
    emailLabel.classList.add('inv-label');      // Apply red color to label
    e.target.classList.add('inv-input');         // Apply red color to input
  }
};

/* =====================================================
   PASSWORD VALIDATION
   ===================================================== */

// Store original password label text for reset purposes
const pLabelText = passLabel.textContent;

/**
 * Password validation on blur (when user leaves the input field)
 * - Validates password strength using regex
 * - Password requirements:
 *   • At least 6 characters long
 *   • Contains at least one uppercase letter (A-Z)
 *   • Contains at least one lowercase letter (a-z)
 *   • Contains at least one number (0-9)
 *   • Contains at least one special character (!@#$%^&*?)
 * - Updates label and applies error styling if invalid
 * - Stores verified password in global variable
 */
passwInput.onblur = (e) => {
  const pass = e.target.value;
  // Regex pattern for strong password:
  // (?=.*[A-Z]) - lookahead for uppercase
  // (?=.*[a-z]) - lookahead for lowercase
  // (?=.*\d) - lookahead for digit
  // (?=.*[!@#$%^&*?]) - lookahead for special character
  // [A-Za-z\d!@#$%^&*?]{6,} - at least 6 characters from allowed set
  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{6,}$/;
  
  console.log('Password input: ', pass);
  
  if (pass === '') {
    // Clear field: reset to original label
    passLabel.textContent = pLabelText;
    if (passLabel.classList.contains('inv-label')) {
      passLabel.classList.remove('inv-label');
      e.target.classList.remove('inv-input');
    }
  } else if (passRegex.test(pass)) {
    // Valid password: show success state
    passLabel.textContent = 'Password';
    if (passLabel.classList.contains('inv-label')) {
      passLabel.classList.remove('inv-label');
      e.target.classList.remove('inv-input');
    }
    // Store the verified password
    strongPass = pass;
    console.log('Verified password:', strongPass);
  } else {
    // Invalid password: show error state
    passLabel.textContent = 'Invalid password';
    passLabel.classList.add('inv-label');       // Apply red color to label
    e.target.classList.add('inv-input');        // Apply red color to input
  }
};

/* =====================================================
   LOGIN BUTTON HANDLER
   ===================================================== */

const button = document.getElementById('button');

/**
 * Login button click handler
 * - Validates that both email and password have been verified
 * - Clears input fields on successful submission
 * - Shows "Authenticating..." message
 * - Displays success alert after 5 second delay
 */
button.onclick = () => {
  // Check if both email and password are verified
  if (verifiedEmail && strongPass) {
    // Clear email input and reset label
    emailInput.value = '';
    emailLabel.textContent = eLabelText;
    
    // Clear password input and reset label
    passwInput.value = '';
    passLabel.textContent = pLabelText;
    
    // Show loading state
    button.textContent = 'Authenticating...';
    
    // Simulate authentication delay (5 seconds)
    setTimeout(() => {
      button.textContent = 'Log-in';
      // Display success message with user credentials
      alert(`Hello ${verifiedEmail} you are logged in with\nPassword: ${strongPass}`);
    }, 5000);
  }
};