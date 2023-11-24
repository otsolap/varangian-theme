import ShareButtons from "@/partials/article/ShareButtons";
import styles from '@/styles/components/articleNavigation.module.scss'

function ArticleNavigation ({  title, socialShareSettings }) {
    return (
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
        <ShareButtons title={title} settings={socialShareSettings} />
      </div>
    );
  }
  
  export default ArticleNavigation ;