import ShareButtons from "@/partials/article/ShareButtons";
import styles from '@/styles/components/articleNavigation.module.scss'
import Link from "next/link";

function ArticleNavigation ({  title }) {

    return (
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
        <ShareButtons title={title} />
      </div>
    );
  }
  
  export default ArticleNavigation ;