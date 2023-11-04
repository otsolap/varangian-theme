import NextImage from "partials/util/NextImage"
import CustomLink from "partials/util/CustomLink"
import styles from '@/styles/components/articleFooter.module.scss'
import { isNotEmpty } from "@/utils/index";

const ArticleFooter = ({ author }) => {
  return (
    isNotEmpty(author) ? (
      <footer className={styles.footer}>
        <div className={styles.column}>
            <figure className={styles.imageContainer}>
                <NextImage image={author.image} className={styles.image} />
            </figure>
        </div>
        <div className={styles.column}>
            <article className={styles.wrapper}>
                {author.title && <h3>{author.title}</h3>}
                {author.description && <p>{author.description}</p>}
                {author.buttons && (
                  <div className={styles.buttonWrapper}>
                    {author.buttons.map((button, i) => (
                      <CustomLink link={button} key={i} className={`button bg-${button.selectTheme}`} />
                    ))}
                  </div>
            )}
            </article>
        </div>
      </footer>
    ): null
  )
}

export default ArticleFooter