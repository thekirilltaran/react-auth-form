import { useForm } from "react-hook-form";
import { memo, useCallback, useState } from "react";
import clsx from "clsx";
import {
  EMAIL_PATTERN,
  FORM_ERRORS_MESSAGES,
  FORM_PASSWORD_CRITERIA_CHECK,
  FORM_PLACEHOLDERS,
} from "../../constants/form";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import SvgPasswordHide, { SvgPasswordShow } from "../svg-components/password";
import styles from "./sign-up.module.scss";

const ChangeTypePassword = memo(({ isShowPassword, handleClick, error, success }) => {
  return (
    <div
      className={clsx(styles.iconPasswordInput, {
        [styles.error]: error,
        [styles.success]: success,
      })}
      onClick={() => handleClick(!isShowPassword)}
    >
      {isShowPassword ? <SvgPasswordHide /> : <SvgPasswordShow />}
    </div>
  );
});

const ErrorsBlock = memo(({ passwordCriteria, isSubmitted }) => {
  return (
    <div className={styles.errorBlock}>
      <p
        className={clsx(
          styles.passwordCheckInfo,
          passwordCriteria.minLength
            ? styles.success
            : isSubmitted
              ? styles.error
              : "",
        )}
      >
        {FORM_ERRORS_MESSAGES.passwordMinLength}
      </p>
      <p
        className={clsx(
          styles.passwordCheckInfo,
          passwordCriteria.uppercase
            ? styles.success
            : isSubmitted
              ? styles.error
              : "",
        )}
      >
        {FORM_ERRORS_MESSAGES.passwordUppercase}
      </p>
      <p
        className={clsx(
          styles.passwordCheckInfo,
          passwordCriteria.number
            ? styles.success
            : isSubmitted
              ? styles.error
              : "",
        )}
      >
        {FORM_ERRORS_MESSAGES.passwordNumber}
      </p>
    </div>
  );
});

const defaultValueForm = {
  email: {
    isValid: false,
  },
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

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { isSubmitted, errors },
  } = useForm({ mode: "onBlur" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [dataFields, setDataFields] = useState(defaultValueForm);

  const validatePassword = useCallback(
    (value) => {
      if (!value) {
        setDataFields((prev) => ({
          ...prev,
          password: defaultValueForm.password,
        }));
        return FORM_ERRORS_MESSAGES.requiredPassword;
      }

      const criteria = FORM_PASSWORD_CRITERIA_CHECK(value);
      const isValid = Object.values(criteria).every(Boolean);

      setDataFields((prev) => ({
        ...prev,
        password: { isValid, criteria },
      }));

      clearErrors("password");

      if (isValid) {
        return true;
      }

      return false;
    },
    [clearErrors],
  );

  const handleBlur = async (fieldName) => {
    const isValid = await trigger(fieldName);
    setDataFields((prev) => ({
      ...prev,
      [fieldName]: { isValid },
    }));
  };

  const onSubmit = useCallback((data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      clearErrors();
    }, 3000);
  }, [isSubmitting, clearErrors]);

  return (
    <div className={styles.blockForm} tabIndex={0}>
      <Title text={"Sign up"} tag="h1" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          type="email"
          placeholder={FORM_PLACEHOLDERS.email}
          messagePattern={FORM_ERRORS_MESSAGES.invalidEmail}
          required={FORM_ERRORS_MESSAGES.requiredEmail}
          register={register}
          valuePattern={EMAIL_PATTERN}
          success={dataFields?.email.isValid}
          error={errors?.email}
          errorText={errors?.email?.message}
          onBlur={() => handleBlur("email")}
        />

        <Input
          className={styles.password}
          name="password"
          type={isShowPassword ? "text" : "password"}
          placeholder={FORM_PLACEHOLDERS.password.create}
          messagePattern={FORM_ERRORS_MESSAGES.requiredPassword}
          validate={(value) => validatePassword(value)}
          register={register}
          success={dataFields?.password.isValid}
          error={errors?.password}
          errorText={errors?.password?.message}
          onChange={(e) => validatePassword(e.target.value)}
          component={
            <ChangeTypePassword
              isShowPassword={isShowPassword}
              handleClick={setIsShowPassword}
              error={errors?.password}
              success={dataFields?.password.isValid}
            />
          }
        />

        <ErrorsBlock
          passwordCriteria={dataFields.password.criteria}
          isSubmitted={isSubmitted}
        />

        <div className={styles.action}>
          <Button
            classNames={clsx({
              [styles.disabled]: isSubmitting,
            })}
            isSubmitting={isSubmitting}
            staticText={"Sign up"}
            pendingText={"Loading"}
            component={<span className={styles.loader}></span>}
          />
        </div>
      </form>
    </div>
  );
};

export { SignUpForm };
