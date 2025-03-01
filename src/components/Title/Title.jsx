import { memo } from "react";
import styles from "./title.module.scss";

/**
 * @description A reusable and customizable title component that renders a heading element.
 * The heading level (e.g., h1, h2, etc.) and text content can be dynamically configured.
 */
const Title = memo(({ text = "Title", tag = "h1" }) => {
  // Dynamically determine the heading tag (e.g., h1, h2, etc.) based on the `tag` prop
  const HeadingTag = tag;

  return (
    <div className={styles.title}>
      {/* Render the heading element with the provided text */}
      <HeadingTag>{text}</HeadingTag>
    </div>
  );
});

export { Title };
