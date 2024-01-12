import { useState, useEffect } from "react";
import styles from "@/styles/components/articleAndServices.module.css";
import BlogItem from "@/partials/blocks/BlogItem";
import Link from "next/link";
import axios from "axios";
import { getStrapiURL } from "@/utils/index";
import config from '@/utils/config'

export default function BlogSection({ title, description, selectTheme, blogs, filter}) {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(getStrapiURL(`/${config.blocks.CONTENT_BLOG_SECTION_LATEST_QUERY}`));
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (filter === 'latest') {
      fetchData();
    }
  }, [filter]);

  const blogItems = filter === "latest" ? items : blogs;

  return (
    <section className={selectTheme == 'primary' ? styles.bgPrimary : styles.bgSecondary}>
      {title || description ? (
        <header className={styles.header}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      ) : null}
      {blogItems?.data?.length ? (
        <div className={styles.wrapper}>
          {blogItems.data.map((item, i) => {
            return (
              <BlogItem
                key={i}
                image={item.attributes.image}
                title={item.attributes.title}
                description={item.attributes.description}
                category={item.attributes.category.data?.attributes}
                publishedAt={item.attributes.publishedAt}
                slug={item.attributes.slug}
              />
            );
          })}
        </div>
      ) : null}
      <footer className={styles.linkWrapper}>
      <Link className={styles.archiveLink} href={`/${config.blog.BLOG_PATH}`}>
          {config.blocks.CONTENT_BLOG_SECTION_BLOG_ARCHIVE_LEAD}
       </Link>
      </footer>
    </section>
  );
};
