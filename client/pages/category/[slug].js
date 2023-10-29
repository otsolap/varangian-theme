import axios from "axios"
import { getStrapiURL } from "@/utils/index"
import Hero from "@/components/blocks/Hero"
import ArchiveSection from "@/components/articles/ArchiveSection"
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
    const response = await axios.get(`${getStrapiURL(`/api/categories`)}`)

    if (!response.data) {
      throw new Error("Failed to fetch API data")
    }

    return {
      paths: response.data.data.map((category) => ({
        params: {
          slug: category.attributes.slug,
        },
      })),
      fallback: false,
    }
  } catch (error) {
    console.error("Error fetching category:", error)

    return {
      paths: [],
      fallback: false,
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const [archiveHeroResponse,categoryResponse, allCategories] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.API_ARCHIVE_HERO_QUERY}`)),
      axios.get(getStrapiURL(`/${config.blog.API_CATEGORIES_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`)),
      axios.get(getStrapiURL("/api/categories")),
    ])

    const matchingCategory = categoryResponse.data.data.find(
      (category) => category.attributes.slug === params.slug
    )

    return {
      props: {
        hero: archiveHeroResponse.data.data.attributes.hero ?? {},
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
