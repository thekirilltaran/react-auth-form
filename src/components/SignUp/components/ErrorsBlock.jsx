import { memo } from "react";
import clsx from "clsx";
import { FORM_ERRORS_MESSAGES } from "../../../constants/form";
import styles from "../sign-up.module.scss";

/**
 * @description A reusable component to display password validation errors or success messages.
 * It dynamically applies styles based on whether the password meets the criteria or if the form has been submitted.
 */
const ErrorsBlock = memo(({ passwordCriteria, isSubmitted }) => {
  return (
    <div className={styles.errorBlock}>
      {/* Display a message for minimum length requirement */}
      <p
        className={clsx(
          styles.passwordCheckInfo,
          passwordCriteria.minLength
            ? styles.success // Apply success style if the minimum length is met
            : isSubmitted
              ? styles.error // Apply error style if the form is submitted and the criteria is not met
              : "", // Default style if the form is not submitted
        )}
      >
        {FORM_ERRORS_MESSAGES.passwordMinLength}
      </p>

      {/* Display a message for uppercase letter requirement */}
      <p
        className={clsx(
          styles.passwordCheckInfo,
          passwordCriteria.uppercase
            ? styles.success // Apply success style if an uppercase letter is present
            : isSubmitted
              ? styles.error // Apply error style if the form is submitted and the criteria is not met
              : "", // Default style if the form is not submitted
        )}
      >
        {FORM_ERRORS_MESSAGES.passwordUppercase}
      </p>

      {/* Display a message for number requirement */}
      <p
        className={clsx(
          styles.passwordCheckInfo,
          passwordCriteria.number
            ? styles.success // Apply success style if a number is present
            : isSubmitted
              ? styles.error // Apply error style if the form is submitted and the criteria is not met
              : "", // Default style if the form is not submitted
        )}
      >
        {FORM_ERRORS_MESSAGES.passwordNumber}
      </p>
    </div>
  );
});

export { ErrorsBlock };
