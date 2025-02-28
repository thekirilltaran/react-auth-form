import { memo } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

const Button = memo(
  ({
    staticText = "Button",
    pendingText = "Button",
    isSubmitting,
    component,
    classNames = "",
  }) => {
    return (
      <button
        className={clsx(styles.button, classNames)}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? component : staticText}
      </button>
    );
  },
);

export { Button };
