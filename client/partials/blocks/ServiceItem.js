import styles from "@/styles/components/blog.module.scss";
import NextImage from "@/partials/util/NextImage";
import Link from "next/link";
import config from '@/utils/config'

const ServiceItem = ({ image, title, description, slug, serviceTypes }) => {

  return (
      <article className={styles.blog}>
        {image.data &&
            <figure className={styles.imageContainer}>
                <Link aria-label={`Read more about ${title}`} className={styles.imageLink}  href={`/${config.blog.BLOG_PATH}/${slug}`}>
                  <NextImage image={image} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className={styles.image}/>
                </Link>
            </figure>
        }
        {title && 
          <Link href={`/${config.blog.BLOG_PATH}/${slug}`}>
              <h3 className={styles.title}>{title}</h3>
          </Link>
        }
        {description && <p className={styles.description}>{description}</p>}
        {categories?.data || formattedDate ? (
          <footer className={styles.footer}>
            {categories &&
              <Link passHref href={`/${config.services.SERVICE_TYPE_PATH}/${categories.slug}`}>
                <h4 className={styles.category}>{categories.title}</h4>
                </Link>
            }
          </footer>
        ): null}
      </article>
  );
};

export default ServiceItem;
