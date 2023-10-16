import ArchiveSection from "@/components/articles/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import axios from "axios"
import config from '@/utils/config'

const Blog = ({ items, categories }) => {
  return <ArchiveSection items={items} categories={categories} />
}

export async function getStaticProps() {
  try {
    const [articlesResponse, categoriesResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.API_ARTICLES_QUERY}`)),
      axios.get(getStrapiURL("/api/categories")),
    ])

    return {
      props: {
        items: articlesResponse.data.data ?? {},
        categories: categoriesResponse.data.data ?? {},
      },
    }
  } catch (error) {
    console.error("Error fetching blog data:", error)

    return {
      notFound: true,
    }
  }
}

export default Blog
