// Regular expression to validate email format (supports most common email patterns)
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Error messages used for form validation
export const FORM_ERRORS_MESSAGES = {
  required: "This field is required",
  requiredEmail: "Email is required",
  invalidEmail: "Invalid email format",
  requiredPassword: "Password is required",
  passwordMinLength: "8 characters or more (no spaces)",
  passwordMaxLength: "Has at most 64 characters (no spaces)",
  passwordUppercase: "Uppercase and lowercase letters",
  passwordNumber: "At least one digit",
  passwordNoSpaces: "The password must not contain spaces",
};

/**
 * Validates password against defined criteria.
 * @param {string} value - The password input by the user.
 * @returns {Object} An object indicating whether each criterion is met.
 */
export const FORM_PASSWORD_CRITERIA_CHECK = (value) => {
  const trimmedValue = value.trim(); // Remove leading/trailing spaces to prevent false positives
  return {
    minLength: trimmedValue.length >= 8,
    maxLength: trimmedValue.length <= 64,
    uppercase: /[A-Z]/.test(trimmedValue),
    number: /\d/.test(trimmedValue),
    noSpaces: !/\s/.test(value), // Ensures no spaces exist anywhere in the password
    notEmpty: trimmedValue.length > 0, // Ensures input is not empty after trimming
  };
};

// Placeholder text used in form inputs
export const FORM_PLACEHOLDERS = {
  email: "Enter your email",
  password: {
    create: "Create your password",
    confirm: "Confirm your password",
  },
};
