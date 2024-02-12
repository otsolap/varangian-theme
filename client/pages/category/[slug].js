import axios from "axios"
import { getStrapiURL } from "@/utils/index"
import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/articles/ArchiveSection"
import config from '@/utils/config'

const Category = ({ hero, items, categories }) => {
  return  (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} categories={categories} />
    </>
  )
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(`${getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`)}`)

    if (!response.data) {
      throw new Error("Failed to fetch API data")
    }

    return {
      paths: response.data.data.map((category) => ({
        params: {
          slug: category.attributes.slug,
        },
      })),
      fallback:'blocking'
    }
  } catch (error) {
    console.error("Error fetching category:", error)

    return {
      paths: [],
      fallback:'blocking'
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const [categoryResponse, allCategories] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.API_CATEGORIES_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`)),
      axios.get(getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`)),
    ])

    const matchingCategory = categoryResponse.data.data.find(
      (category) => category.attributes.slug === params.slug
    )

    return {
      props: {
        hero: matchingCategory.attributes.hero ?? {},
        items: matchingCategory.attributes.articles.data ?? {},
        categories: allCategories.data.data ?? {},
      },
    }
  } catch (error) {
    console.error("Error fetching category:", error)

    return {
      notFound: true,
    }
  }
}

export default Category
