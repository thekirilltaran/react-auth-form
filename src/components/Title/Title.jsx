import { memo } from "react";
import styles from "./title.module.scss";

const Title = memo(({ text = "Title", tag = "h1" }) => {
  const HeadingTag = tag;

  return (
    <div className={styles.title}>
      <HeadingTag>{text}</HeadingTag>
    </div>
  );
});

export { Title };
