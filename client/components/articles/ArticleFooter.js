import NextImage from "partials/util/NextImage"
import styles from '@/styles/components/articleFooter.module.scss'
import { isNotEmpty } from "@/utils/index";
import ContactDetails from '@/partials/util/ContactDetails'

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
                {author.socialMedia && (
                  <div className={styles.buttonWrapper}>
                      <ContactDetails list={author.socialMedia} />
                  </div>
            )}
            </article>
        </div>
      </footer>
    ): null
  )
}

export default ArticleFooter