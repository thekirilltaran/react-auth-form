import { memo } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

/**
 * @description A reusable and customizable button component that supports dynamic text, loading states, and custom class names.
 * It can display a static text or a pending state (e.g., a spinner or loading text) when `isSubmitting` is true.
 */
const Button = memo(
  ({
    staticText = "Button", // Default text for the button
    pendingText = "Button", // Text or component to display during pending state (not used in current implementation)
    isSubmitting, // Flag to indicate if the button is in a submitting/pending state
    component, // Custom component (e.g., spinner) to display during pending state
    classNames = "", // Additional CSS classes for custom styling
  }) => {
    return (
      <button
        className={clsx(styles.button, classNames)} // Combine default and custom class names
        type="submit" // Button type (submit by default)
        disabled={isSubmitting} // Disable the button during submission
      >
        {/* Display a custom component (e.g., spinner) during submission, otherwise show static text */}
        {isSubmitting ? component : staticText}
      </button>
    );
  },
);

export { Button };
