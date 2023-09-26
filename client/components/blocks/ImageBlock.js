import NextImage from "@/partials/util/NextImage";
import styles from '@/styles/components/imageBlock.module.scss'

const ImageBlock = ({  image }) => {
  return (
      image.data ? (
        <section>
          <figure className={styles.imageBlock}>
            <NextImage image={image} className={styles.image}/>
          </figure>
        </section>
    ): null
  );
};

export default ImageBlock;