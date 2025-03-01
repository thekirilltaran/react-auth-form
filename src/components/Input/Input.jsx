import { memo } from "react";
import clsx from "clsx";
import styles from "./input.module.scss";

/**
 * @description A reusable and customizable input component with support for validation, error handling, and dynamic styling.
 * It integrates with `react-hook-form` for form management and supports custom validation rules, error messages, and additional components (e.g., icons).
 */

const Input = memo(
  ({
    name,
    type = "text",
    isSubmitting = false,
    validate,
    register,
    error,
    success = false,
    valuePattern = "",
    messagePattern = "",
    required,
    errorText = "",
    component = null,
    ...rest
  }) => {
    // Define validation rules for react-hook-form
    const validationRules = {
      required: required ? "This field is required" : undefined,
      validate: validate || undefined,
      ...(valuePattern && {
        pattern: {
          value: new RegExp(valuePattern), // Convert string to RegExp for validation
          message: messagePattern, // Error message if the pattern doesn't match
        },
      }),
    };

    return (
      <div className={styles.inputBlock}>
        {/* Input container with dynamic classes based on state */}
        <div
          className={clsx(styles.input, {
            [styles.error]: error, // Apply error styling if there's an error
            [styles.success]: success, // Apply success styling if the field is valid
            [styles.disabled]: isSubmitting, // Disable the field if the form is submitting
          })}
        >
          <input
            type={type}
            autoComplete="off"
            {...register(name, validationRules)} // Register the field with react-hook-form
            disabled={isSubmitting} // Disable the input during form submission
            {...rest} // Pass any additional props to the input
          />

          {/* Render an additional component (e.g., an icon) if provided */}
          {component}
        </div>

        {/* Display error message if there's an error */}
        {error && (
          <div className={styles.error}>
            <p role="alert">{errorText}</p>
          </div>
        )}
      </div>
    );
  },
);

export { Input };
