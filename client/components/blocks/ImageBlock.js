import NextImage from "@/partials/util/NextImage";
import styles from '@/styles/components/imageBlock.module.css'

const ImageBlock = ({  image, caption }) => {
  return (
      image.data ? (
        <section className={styles.wrapper}>
          <figure className={styles.imageBlock}>
            <NextImage image={image} className={styles.image} />
            {caption ? (
              <figcaption className={styles.caption}>{caption}</figcaption>
            ) : null}
          </figure>
        </section>
    ): null
  );
};

export default ImageBlock;