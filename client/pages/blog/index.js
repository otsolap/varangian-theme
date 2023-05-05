import ArchiveSection from "@/components/articles/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import axios from "axios"

const Blog = ({ items, categories  }) => {
    return <ArchiveSection items={items} categories={categories} />
}

export async function getStaticProps() {
    const [articlesResponse, categoriesResponse] = await Promise.all([
        axios.get(getStrapiURL(`/${process.env.NEXT_PUBLIC_REST_API_ARTICLE_QUERY}`)),
        axios.get(getStrapiURL("/api/categories")),
    ])

    return {
        props: {
            items: articlesResponse.data.data,
            categories: categoriesResponse.data.data,
        }
    }
}

export default Blog