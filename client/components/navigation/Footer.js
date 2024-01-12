import Blocks from "@/components/Blocks";
import styles from '@/styles/components/footer.module.css'
import CustomLink from '@/partials/util/CustomLink'

const Footer = ({ footer }) => {
  const global = footer && footer.data ? footer.data.attributes : {};

  function getSupportClass(blocksLength) {
    switch (blocksLength) {
      case 1:
        return 'singleColumn'; 
      case 2:
        return 'doubleColumn'; 
      case 3:
        return 'tripleColumn'; 
      case 4:
        return 'quadrupleColumn';
      case 5:
        return 'quintupleColumn';
      default:
        return ''; 
    }
  }

  const blockContent = global.blocks ? (
    <div className={`${styles.columnContainer} ${styles[getSupportClass(global.blocks.length)]}`}>
      <Blocks blocks={global.blocks} />
    </div>
  ) : null;

  return (
    <>
      <footer className={styles.footer}>
        {blockContent}
        {global.subFooter ? (
          <div className={styles.subFooter}>
            <div className={styles.subFooterContent}>
              <span className={styles.brand}>{global.subFooter.title} &#169; {new Date().getFullYear()} </span> 
              <span className="desktop-only"> &#124;</span> 
                {global.subFooter.link ?  (
                  <CustomLink className={styles.legal} link={global.subFooter.link} />
                ): null}
              </div>
          </div>
        ): null}
      </footer>
    </>
  );
};

export default Footer;
