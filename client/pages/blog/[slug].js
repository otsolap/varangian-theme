import { useContext, useEffect } from "react";
import { GlobalContext } from "@/pages/_app.js";
import axios from "axios"
import { getStrapiURL } from "utils"
import Blocks from "@/components/Blocks";
import styles from '@/styles/pages/blog.module.scss'
import ArticleHeading from "@/components/articles/ArticleHeading";
import ArticleFooter from "@/components/articles/ArticleFooter";
import HeadingLinks from "@/partials/article/HeadingLinks";
import BlogSection from "components/blocks/BlogSection";
import config from '@/utils/config'

const Blog = ({ article, categories, author, banner, relatedItems }) => {

  const { setBlogNavigation } = useContext(GlobalContext);

  useEffect(() => {
    setBlogNavigation({
      title: article.title,
      href: `/blog/${article.slug}`
    });
  
    return () => setBlogNavigation(null);
  }, [article, setBlogNavigation]);

  return (
    <>
      <ArticleHeading article={article} categories={categories} author={author} />
      <div className={styles.wrapper}>
        <article id={'post'} className={styles.article}>
          <Blocks blocks={article.blocks} />
        </article>
        <HeadingLinks blocks={article.blocks} title={article.title} banner={banner} />
      </div>
      <ArticleFooter author={author} />
      {relatedItems.data &&       
        <BlogSection
          title={config.blog.RELATED_ARTICLES_TITLE}
          selectTheme={config.blog.RELATED_ARTICLES_THEME}
          blogs={relatedItems}
          link={{
            href: `/${config.blog.RELATED_ARTICLES_LINK}`,
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
      fallback: false,
    }
  } catch (error) {
    console.error('Error fetching articles:', error)

    return {
      paths: [],
      fallback: false,
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const [articleResponse, newsletterResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.API_ARTICLE_QUERY}${params.slug}`)),
   //   axios.get(getStrapiURL(`/${config.global.API_NEWSLETTER_BANNER_QUERY}`)),
    ])

    const categorySlug = articleResponse.data.data[0].attributes.categories.data[0]?.attributes.slug

    const [relatedArticlesResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.RELATED_ARTICLES_QUERY}${categorySlug}${config.blog.RELATED_ARTICLES_QUERY_ARGUMENTS}`)),
    ])

    return {
      props: {
        article: articleResponse.data.data[0]?.attributes ?? {},
        categories: articleResponse.data.data[0]?.attributes.categories.data[0]?.attributes ?? {},
        author: articleResponse.data.data[0]?.attributes.author.data?.attributes ?? {},
        banner: {}, // newsletterResponse.data?.data?.attributes ?? 
        relatedItems: relatedArticlesResponse.data?.data[0]?.attributes.articles ?? {}
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
