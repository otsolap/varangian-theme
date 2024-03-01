import ShareButtons from "@/partials/article/ShareButtons";
import styles from '@/styles/components/articleNavigation.module.css'

function ServicesNavigation ({  title }) {
    return (
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
      </div>
    );
  }
  
  export default ServicesNavigation ;