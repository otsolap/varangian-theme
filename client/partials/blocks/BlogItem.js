import styles from "@/styles/components/blog.module.scss";
import NextImage from "@/partials/util/NextImage";
import Link from "next/link";

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
            <Link  href={`/${process.env.NEXT_PUBLIC_BLOGI_PATH}/${slug}`}>
              <figure className={styles.imageContainer}>
                <NextImage image={image} className={styles.image}/>
              </figure>
             </Link>
        }
        {title && 
          <Link href={`/${process.env.NEXT_PUBLIC_BLOGI_PATH}/${slug}`}>
              <h3 className={styles.title}>{title}</h3>
          </Link>
        }
        {description && <p className={styles.description}>{description}</p>}
        {categories?.data || formattedDate ? (
          <footer className={styles.footer}>
            {categories &&
              <Link passHref href={`/${process.env.NEXT_PUBLIC_CATEGORY_PATH}/${categories.slug}`}>
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
