import NextImage from "partials/util/NextImage"
import Link from "next/link"
import styles from '@/styles/components/articleHeading.module.scss'
import config from '@/utils/config'

const ArticleHeading = ({ article, categories, author}) => {
    console.log(author.image)
  return (
    <header className={styles.header}>
        <div className={styles.lead}>
                {categories && 
                    <Link href={`/${config.blog.CATEGORY_PATH}/${categories.slug}`}>
                        <h4 className={styles.category}>{categories.title}</h4>
                    </Link>
                }
                {article.title && <h1>{article.title}</h1>}
                {article.description && <h3>{article.description}</h3>}
                {author &&
                     <article className={styles.author}>
                        {author.image &&
                        <figure className={styles.authorImageContainer}>
                            <NextImage image={author.image} className={styles.authorImage} />
                        </figure>
                        }
                        <div className={styles.column}>
                            {author.title && <h3 className={styles.title}>{author.title}</h3>}
                            {author.subtitle && <h4>{author.subtitle}</h4>}
                        </div>
                     </article>
                }
        </div>
        <figure className={styles.imageContainer}>
            <NextImage image={article.image} className={styles.image} />
        </figure>
  </header>
  )
}

export default ArticleHeading