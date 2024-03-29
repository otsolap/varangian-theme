import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/articles/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import axios from "axios"
import config from '@/utils/config'

const BlogArchive = ({ hero, items, categories }) => {
  return  (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} categories={categories} />
    </>
  )
}

export async function getStaticProps() {
  try {
    const [archivePageResponse, articlesResponse, categoriesResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.blog.API_ARCHIVE_PAGE_QUERY}`)),
      axios.get(getStrapiURL(`/${config.blog.API_ARTICLES_QUERY}`)),
      axios.get(getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`)),
    ])

    return {
      props: {
        hero: archivePageResponse.data.data.attributes.hero ?? {},
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

export default BlogArchive
