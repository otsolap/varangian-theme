import { useContext } from 'react';
import { GlobalContext } from '@/pages/_app';
import styles from "@/styles/components/header.module.scss";
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
        {global.buttons ? (
          global.buttons.map((button, i) => (
            <CustomLink link={button} key={i} className={`${styles.calendar} mobile-only button button--${button.selectTheme}`} />
          ))
        ) : null}
      </header>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          {blogNavigation ? (
            <div className={styles.menu}>
              <ArticleNavigation {...blogNavigation} />
            </div>
          ) : global.blocks && (
            <div className={styles.menu}>
              <Blocks blocks={global.blocks} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
