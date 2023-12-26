import styles from "@/styles/components/textarea.module.scss";
import MarkdownBlock from "@/partials/util/MarkdownBlock";

const Textarea = ({ text, selectTheme }) => {
  return (
      text ? (
        <section className={`${styles.content} bg-${selectTheme} ${selectTheme === 'primary' ? 'color-black' : ''}` }>
         <MarkdownBlock className={styles.inputWrapper} markdown={text} /> 
      </section>
      ) : null
  );
};

export default Textarea;
