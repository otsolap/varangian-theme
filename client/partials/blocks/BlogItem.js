import styles from "@/styles/components/blog.module.scss";
import NextImage from "@/partials/util/NextImage";
import Link from "next/link";
import config from '@/utils/config'

const BlogItem = ({ image, title, description, slug, categories, publishedAt }) => {
  let formattedDate = null;
  if(publishedAt) {
    const dateObj = new Date(publishedAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    formattedDate = dateObj.toLocaleDateString('en-US', options);
  }

  return (
      <article className={styles.blog}>
        {image.data &&
            <Link aria-label={`Read more about ${title}`} className={styles.imageLink}  href={`/${config.blog.BLOG_PATH}/${slug}`}>
              <figure className={styles.imageContainer}>
                <NextImage image={image} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className={styles.image}/>
              </figure>
             </Link>
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
              <Link passHref href={`/${config.blog.CATEGORY_PATH}/${categories.slug}`}>
                <h4 className={styles.category}>{categories.title}</h4>
                </Link>
            }
          {formattedDate && <p>{formattedDate}</p>}
          </footer>
        ): null}
      </article>
  );
};

export default BlogItem;
