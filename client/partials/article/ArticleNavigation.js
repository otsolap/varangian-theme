import ShareButtons from "@/partials/article/ShareButtons";
import styles from '@/styles/components/articleNavigation.module.scss'
import Link from "next/link";

function ArticleNavigation ({  title }) {

    return (
      <div className={styles.wrapper}>
        <h5>{title}</h5>
        <ShareButtons title={title} />
        <Link href="/subscribe" className={'button button--primary'}>Subscribe</Link>
      </div>
    );
  }
  
  export default ArticleNavigation ;