import styles from "@/styles/components/articleAndServices.module.scss";
import NextImage from "@/partials/util/NextImage";
import Link from "next/link";
import config from '@/utils/config'

const BlogItem = ({ image, title, description, slug, category, publishedAt }) => {
  let formattedDate = null;
  if(publishedAt) {
    const dateObj = new Date(publishedAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    formattedDate = dateObj.toLocaleDateString('en-US', options);
  }

  return (
      <article className={styles.item}>
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
        {category?.data || formattedDate ? (
       <footer className={`${styles.footer} ${styles.footerColumn}`}>
            {category &&
              <Link passHref href={`/${config.blog.CATEGORY_PATH}/${category.slug}`}>
                <h4 className={styles.category}>{category.title}</h4>
                </Link>
            }
          {formattedDate && <p>{formattedDate}</p>}
          </footer>
        ): null}
      </article>
  );
};

export default BlogItem;
