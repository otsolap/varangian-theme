import styles from "@/styles/components/cards.module.css";
import NextImage from "@/partials/util/NextImage";
import MarkdownBlock from "@/partials/util/MarkdownBlock";

const CardItem = ({ image, title, description, className }) => {
  return (
    <article className={`${styles.card} ${className ? className : ''}`}>
      {image.data ? (
        <figure className={styles.imageContainer}>
          <NextImage
            width={150}
            height={150}
            image={image}
            className={styles.image}
          />
        </figure>
      ): null}
      {title || description ? (
        <div className={styles.body}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <MarkdownBlock markdown={description} />}
        </div>
        ): null}
    </article>
  );
};

export default CardItem;
