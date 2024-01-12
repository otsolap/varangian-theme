import { useContext } from 'react';
import { GlobalContext } from '@/pages/_app';
import styles from "@/styles/components/header.module.css";
import Blocks from "@/components/Blocks";
import ArticleNavigation from 'partials/article/ArticleNavigation';
import CustomLink from "@/partials/util/CustomLink";


const Header = ({ navigation }) => {
  const {  blogNavigation } = useContext(GlobalContext);
  const global = navigation && navigation.data ? navigation.data.attributes : {};
  const brand = { href: '/', title: global ? global.title : {} };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          {global.title ? (
            <CustomLink className={styles.title} link={brand} />
          ) : null}
          {global.slogan ? (
            <p className={styles.slogan}>{global.slogan}</p>
          ) : null}
        </div>
        {blogNavigation && blogNavigation.button ? ( 
          <CustomLink 
            link={blogNavigation.button} 
            className={`${styles.calendar} mobile-only button button--${global.button.selectTheme}`} 
          />
        ) : global.button ? (
          <CustomLink 
            link={global.button} 
            className={`${styles.calendar} mobile-only button button--${global.button.selectTheme}`} 
          />
        ) : null }
      </header>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          {blogNavigation ? (
            <>
              <div className={styles.menu}>
                <ArticleNavigation {...blogNavigation} />
              </div>
              {blogNavigation.button ? (
                <CustomLink 
                link={blogNavigation.button} 
                className={`${styles.calendar} button button--${global.button.selectTheme}`} 
              />
              ) : null}
            </>
          ) : global.blocks && (
            <>
              <div className={styles.menu}>
                <Blocks blocks={global.blocks} />
              </div>
              {global.button ? (
                  <CustomLink 
                    link={global.button} 
                    className={`${styles.calendar} button button--${global.button.selectTheme}`} 
                  />
                ) : null }
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
