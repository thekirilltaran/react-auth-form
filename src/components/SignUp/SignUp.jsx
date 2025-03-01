// External Libraries
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import clsx from "clsx";
import { ToastContainer, toast, Bounce } from "react-toastify";

// Constants and Utilities
import {
  EMAIL_PATTERN,
  FORM_ERRORS_MESSAGES,
  FORM_PASSWORD_CRITERIA_CHECK,
  FORM_PLACEHOLDERS,
} from "../../constants/form";
import { abstractApiKey } from "constants/env-constants";
import { checkEmailExists } from "../../utils/form";

// Internal Components
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { ErrorsBlock } from "./components/ErrorsBlock";
import { TogglePasswordButton } from "./components/TogglePasswordButton";

// Styles
import styles from "./sign-up.module.scss";

// API URL for email validation
const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${abstractApiKey}&email=`;

// Default state for password validation
const defaultValueForm = {
  password: {
    isValid: false,
    criteria: {
      minLength: false,
      maxLength: false,
      uppercase: false,
      number: false,
      noSpaces: false,
      notEmpty: false,
    },
  },
};

/**
 * @description SignUpForm component for handling user registration.
 * It includes form validation for email and password, toggling password visibility, and displaying success/error messages.
 */
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { isSubmitted, errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" }); // Initialize react-hook-form with validation on blur

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [isShowPassword, setIsShowPassword] = useState(false); // Toggle password visibility
  const [checkEmailLoader, setCheckEmailLoader] = useState(false); // Loading state for email validation
  const [dataFields, setDataFields] = useState(defaultValueForm); // State for password validation criteria

  // Show a success toast notification
  const notify = () => toast.success("Operation successful!");

  /**
   * Validates the password against predefined criteria.
   * Updates the password validation state and clears errors if the password is valid.
   */
  const validatePassword = useCallback(
    (value) => {
      if (!value) {
        setDataFields((prev) => ({
          ...prev,
          password: defaultValueForm.password,
        }));
        return FORM_ERRORS_MESSAGES.requiredPassword;
      }

      const criteria = FORM_PASSWORD_CRITERIA_CHECK(value); // Check password against criteria
      const isValid = Object.values(criteria).every(Boolean); // Determine if all criteria are met

      setDataFields((prev) => ({
        ...prev,
        password: { isValid, criteria }, // Update password validation state
      }));

      clearErrors("password"); // Clear password errors if the password is valid

      return isValid || false; // Return true if valid, otherwise false
    },
    [clearErrors],
  );

  // Check if the email field is valid and not in a loading state
  const emailValue = getValues("email");
  const emailSuccess = Boolean(
    emailValue && !errors.email && !checkEmailLoader,
  );

  /**
   * Validates the email field.
   * Checks if the email is provided, matches the pattern, and exists using an external API.
   */
  const validateEmail = async (value, fieldName) => {
    if (!value) return FORM_ERRORS_MESSAGES.requiredEmail; // Check if email is empty
    if (!EMAIL_PATTERN.test(value)) return FORM_ERRORS_MESSAGES.invalidEmail; // Check if email matches the pattern

    const isValid = await checkEmailExists(value, url, setCheckEmailLoader); // Validate email using API
    if (!isValid) return FORM_ERRORS_MESSAGES.emailNotFound; // Return error if email is not found

    return true; // Return true if email is valid
  };

  /**
   * Handles form submission.
   * Displays a success notification and resets the form after a delay.
   */
  const onSubmit = useCallback(
    (data) => {
      if (isSubmitting) return; // Prevent multiple submissions
      setIsSubmitting(true); // Set loading state
      notify(); // Show success notification
      setTimeout(() => {
        setIsSubmitting(false); // Reset loading state
        clearErrors(); // Clear form errors
      }, 3000); // Delay for demonstration purposes
    },
    [isSubmitting, clearErrors],
  );

  return (
    <div className={styles.blockForm} tabIndex={0}>
      {/* Form title */}
      <Title text={"Sign up"} tag="h1" />

      {/* Toast notification container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {/* Registration form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email input field */}
        <Input
          name="email"
          type="email"
          placeholder={FORM_PLACEHOLDERS.email}
          messagePattern={FORM_ERRORS_MESSAGES.invalidEmail}
          required={FORM_ERRORS_MESSAGES.requiredEmail}
          register={register}
          validate={(e) => validateEmail(e, "email")}
          valuePattern={EMAIL_PATTERN}
          success={emailSuccess}
          error={errors?.email}
          errorText={errors?.email?.message}
          component={
            checkEmailLoader && ( // Show loader during email validation
              <span className={clsx(styles.loader, styles.emailLoader)}></span>
            )
          }
        />

        {/* Password input field */}
        <Input
          className={styles.password}
          name="password"
          type={isShowPassword ? "text" : "password"} // Toggle password visibility
          placeholder={FORM_PLACEHOLDERS.password.create}
          messagePattern={FORM_ERRORS_MESSAGES.requiredPassword}
          validate={(value) => validatePassword(value)}
          register={register}
          success={dataFields?.password.isValid}
          error={errors?.password}
          errorText={errors?.password?.message}
          onChange={(e) => validatePassword(e.target.value)} // Validate password on change
          component={
            <TogglePasswordButton
              isShowPassword={isShowPassword}
              handleClick={setIsShowPassword}
              error={errors?.password}
              success={dataFields?.password.isValid}
            />
          }
        />

        {/* Display password validation errors or success messages */}
        <ErrorsBlock
          passwordCriteria={dataFields.password.criteria}
          isSubmitted={isSubmitted}
        />

        {/* Submit button */}
        <div className={styles.action}>
          <Button
            classNames={clsx({
              [styles.disabled]: isSubmitting, // Disable button during submission
            })}
            isSubmitting={isSubmitting}
            staticText={"Sign up"}
            pendingText={"Loading"}
            component={<span className={styles.loader}></span>} // Show loader during submission
          />
        </div>
      </form>
    </div>
  );
};

export { SignUpForm };
