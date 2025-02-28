import { memo } from "react";
import clsx from "clsx";
import styles from "./input.module.scss";

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
    const validationRules = {
      required: required || undefined,
      validate: validate || undefined,
      pattern: valuePattern
        ? { value: valuePattern, message: messagePattern }
        : undefined,
    };

    return (
      <div className={styles.inputBlock}>
        <div
          className={clsx(styles.input, {
            [styles.error]: error,
            [styles.success]: success,
            [styles.disabled]: isSubmitting,
          })}
        >
          <input
            type={type}
            autoComplete="off"
            {...register(name, validationRules)}
            {...rest}
          />

          {component}
        </div>
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
