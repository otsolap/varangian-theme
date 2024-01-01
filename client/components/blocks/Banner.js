import styles from "@/styles/components/banner.module.scss";
import MarkdownBlock from "@/partials/util/MarkdownBlock";
import NextImage from "@/partials/util/NextImage";
import CustomLink from "@/partials/util/CustomLink";

const Banner = ({ title, description, image, button, selectTheme }) => {
  return (
    <section className={`${styles.banner} bg-${selectTheme} ${selectTheme === 'primary' ? 'color-black' : ''}` }>
        {image?.data && (
          <figure className={styles.imageContainer}>
            <NextImage
              className={styles.image}
              image={image}
              width={150}
              height={150}
            />
          </figure>
        )}
        {title || description || button ? (
        <div className={styles.content}>
          {title && <h2>{title}</h2>}
          {description && <MarkdownBlock markdown={description} />}
          {button && (
            <footer className={styles.buttonWrapper}>
                <CustomLink link={button} className={`button button--${button.selectTheme}`}  />
            </footer>
          )}
        </div>
        ): null}
      </section>
  );
};

export default Banner;
