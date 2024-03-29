import { useContext, useEffect } from "react";
import { GlobalContext } from "@/pages/_app.js";
import axios from "axios"
import { getStrapiURL } from "utils"
import Blocks from "@/components/Blocks";
import styles from '@/styles/pages/blog.module.css'
import ArticleHeading from "@/components/articles/ArticleHeading";
import ArticleFooter from "@/components/articles/ArticleFooter";
import HeadingLinks from "@/partials/article/HeadingLinks";
import BlogSection from "components/blocks/BlogSection";
import config from '@/utils/config'
import Banner from "components/blocks/Banner";

const Blog = ({ article, category, author, banner, relatedItems, blogNavigation }) => {
  const { setMetaData, setBlogNavigation } = useContext(GlobalContext);

  useEffect(() => {
    setMetaData({
      metaData: article.seo,
    });

    setBlogNavigation({
      title: article.title,
      href: `/${config.blog.BLOG_PATH}/${article.slug}`,
      socialShareSettings: blogNavigation.social,
      button: blogNavigation.button,
    });
  
    return () => {
      setMetaData(null); 
      setBlogNavigation(null);
    };
  }, [article, setMetaData, blogNavigation, setBlogNavigation ]);
  

  return (
    <>
      <ArticleHeading article={article} category={category} author={author} />
      <div className={styles.wrapper}>
        <article id={'post'} className={styles.article}>
          <Blocks blocks={article.blocks} />
        </article>
        <HeadingLinks blocks={article.blocks} title={article.title} />
      </div>
      <ArticleFooter author={author} />
      <Banner {...banner} />
      {relatedItems.data &&       
        <BlogSection
          title={config.blog.RELATED_ARTICLES_TITLE}
          selectTheme={config.blog.RELATED_ARTICLES_THEME}
          blogs={relatedItems}
          link={{
            href: `/${config.blog.BLOG_PATH}`,
            title: `${config.blog.RELATED_ARTICLES_LINK_TITLE}`
          }}
        />}
    </>
  )
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(`${getStrapiURL(`/api/articles`)}`)

    if (!response.data) {
      throw new Error('Failed to fetch API data')
    }

    return {
      paths: response.data.data.map((article) => ({
        params: {
          slug: article.attributes.slug,
        },
      })),
       fallback:'blocking'
    }
  } catch (error) {
    console.error('Error fetching articles:', error)

    return {
      paths: [],
       fallback:'blocking'
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const [articleResponse, blogNavigationResponse, newsletterResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.API_ARTICLE_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`)),
      axios.get(getStrapiURL(`/${config.blog.API_BLOG_NAVIGATION_QUERY}`)),
      axios.get(getStrapiURL(`/${config.global.API_NEWSLETTER_BANNER_QUERY}`)),
    ])

    const categorySlug = articleResponse.data.data[0].attributes.category.data[0]?.attributes.slug

    const [relatedArticlesResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.RELATED_ARTICLES_QUERY}${categorySlug}${config.blog.RELATED_ARTICLES_QUERY_ARGUMENTS}`)),
    ])

    return {
      props: {
        article: articleResponse.data.data[0]?.attributes ?? {},
        category: articleResponse.data.data[0]?.attributes.category.data[0]?.attributes ?? {},
        author: articleResponse.data.data[0]?.attributes.author.data?.attributes ?? {},
        banner: newsletterResponse.data?.data?.attributes ?? {},
        relatedItems: relatedArticlesResponse.data?.data[0]?.attributes.articles ?? {},
        blogNavigation: blogNavigationResponse.data?.data?.attributes ?? {},
      },
    }
  } catch (error) {
    console.error('Error fetching blog data:', error)

    return {
      notFound: true,
    }
  }
}

export default Blog
