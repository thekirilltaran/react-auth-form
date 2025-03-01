import { memo } from "react";
import clsx from "clsx";
import styles from "../sign-up.module.scss";
import SvgPasswordHide, {
  SvgPasswordShow,
} from "components/svg-components/password";

/**
 * @description A reusable button component to toggle password visibility.
 * It dynamically switches between "show" and "hide" icons and applies styles based on error or success states.
 */
const TogglePasswordButton = memo(
  ({ isShowPassword, handleClick, error, success }) => {
    return (
      <div
        className={clsx(styles.iconPasswordInput, {
          [styles.error]: error, // Apply error styling if there's an error
          [styles.success]: success, // Apply success styling if the field is valid
        })}
        onClick={() => handleClick(!isShowPassword)} // Toggle password visibility on click
      >
        {/* Display the "hide" icon if the password is visible, otherwise show the "show" icon */}
        {isShowPassword ? <SvgPasswordHide /> : <SvgPasswordShow />}
      </div>
    );
  },
);

export { TogglePasswordButton };
