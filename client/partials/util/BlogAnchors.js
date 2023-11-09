import { useState, useEffect } from "react";
import styles from "@/styles/components/blogAnchor.module.scss";
import Link from "next/link";
import axios from "axios";
import { getStrapiURL } from "@/utils/index";
import config from '@/utils/config'

const BlogAnchors = ({ blogAnchors}) => {
  const [items, setItems] = useState([]);
  let { blogs, filter } = blogAnchors

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
      blogItems?.data?.length ? (
        <div className={styles.wrapper}>
          {blogItems.data.map((item, i) => {
            return (
              <Link  className={styles.link} key={i} href={`/${config.blog.BLOG_PATH}/${item.attributes.slug}`}>
                {item.attributes.title}
                </Link>
            );
          })}
        </div>
      ) : null
  );
};

export default BlogAnchors
