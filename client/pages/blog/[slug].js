import axios from "axios"
import { getStrapiURL } from "utils"
import Blocks from "@/components/Blocks";
import styles from '@/styles/pages/blog.module.scss'
import ArticleHeading from "@/components/articles/ArticleHeading";
import ArticleFooter from "@/components/articles/ArticleFooter";
import HeadingLinks from "@/partials/article/HeadingLinks";
import BlogSection from "components/blocks/BlogSection";

const Article = ({ article, categories, author, banner, relatedItems }) => {

  return (
    <>
    <ArticleHeading article={article} categories={categories} author={author} />
    <div className={styles.wrapper}>
        <article className={styles.article}>
          <Blocks blocks={article.blocks} />
        </article>
        <HeadingLinks blocks={article.blocks} description={article.title} banner={banner} />
    </div>
    <ArticleFooter author={author} />
    <BlogSection 
      title={process.env.NEXT_PUBLIC_RELATED_ARTICLES_TITLE}  
      selectTheme={process.env.NEXT_PUBLIC_RELATED_ARTICLES_THEME}
      blogs={relatedItems}  
      link={{
        href: `${process.env.NEXT_PUBLIC_RELATED_ARTICLES_LINK}`, 
        title: `${process.env.NEXT_PUBLIC_RELATED_ARTICLES_LINK_TITLE}`
      }} 
      />
    </>
  )
}

export async function getStaticPaths() {
  return axios
    .get(`${getStrapiURL(`/api/articles`)}`)
    .then((response) => {
      if (!response.data) {
        throw new Error('Failed to fetch API data');
      }

      return {
        paths: response.data.data.map((article) => ({
          params: {
            slug: article.attributes.slug,
          },
        })),
        fallback: false,
      };
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);

      return {
        paths: [],
        fallback: false,
      };
    });
}


export async function getStaticProps({ params }) {
  const [articleResponse, newsletterResponse] = await Promise.all([
    axios.get(getStrapiURL(`/${process.env.NEXT_PUBLIC_REST_API_ARTICLE_QUERY}${params.slug}`)),
    axios.get(getStrapiURL(`/${process.env.NEXT_PUBLIC_REST_API_NEWSLETTER_BANNER_QUERY}}`)),
  ])

  const categorySlug = articleResponse.data.data[0].attributes.categories.data[0]?.attributes.slug

  const [relatedArticlesresponse] = await Promise.all([
      axios.get(getStrapiURL(`/${process.env.NEXT_PUBLIC_RELATED_ARTICLES_QUERY_FILTER}${categorySlug}${process.env.NEXT_PUBLIC_RELATED_ARTICLES_QUERY_ARGUMENTS}`)),
    ])
    

  return {
    props: { 
      article: articleResponse.data.data[0].attributes, 
      categories: articleResponse.data.data[0].attributes.categories.data[0]?.attributes ?? [],
      author: articleResponse.data.data[0].attributes.author.data?.attributes ?? [],
      banner: newsletterResponse.data.data.attributes ?? [],
      relatedItems: relatedArticlesresponse.data.data[0].attributes.articles ?? [],
    },
    revalidate: 1,
  }
}

export default Article