import axios from 'axios'
import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'

export default async function revalidate(req, res) {
    const webhookHeader = req.headers['x-strapi-revalidate-webhook']

    if (webhookHeader && webhookHeader !== 'true') {
        return res.status(401).json({ message: 'Unauthorized: Invalid or missing required header value.' })
    }

    const { secret, slug: rawSlug } = req.query

    if (secret !== process.env.NEXT_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid secret' })
    }

    if (!rawSlug) {
        return res.status(400).json({ message: 'Slug parameter is missing' })
    }

    const trimmedSlug = rawSlug.startsWith('/') ? rawSlug.substring(1) : rawSlug
    const segments = trimmedSlug.split('/')

    const type = segments[0] || 'page'
    let slug = segments.length > 1 ? segments.slice(1).join('/') : trimmedSlug

    if (!slug || rawSlug === "/") {
        slug = '/' // Home page
    }

    try {
        await fetchDataByType(type, slug)
        return res.json({ revalidated: true, slug: rawSlug })
    } catch (error) {
        console.error("Error during revalidation:", error.message)
        return res.status(500).json({ message: error.message })
    }
}


async function fetchDataByType(type, slug) {

    const typeConfig = {
        'page': {
            endpoint: 'pages',
            query: config.global.API_CONTENT_QUERY
        },
        'articles': {
            endpoint: 'articles',
            query: config.blog.API_ARTICLES_QUERY
        },
        'services': {
            endpoint: 'services',
            query: config.services.API_SERVICES_CONTENT_QUERY
        },
        'categories': {
            endpoint: 'categories',
            query: config.blog.API_CATEGORIES_CONTENT_QUERY
        },
        'service-types': {
            endpoint: 'service-types',
            query: config.services.API_SERVICE_TYPES_CONTENT_QUERY
        },
    }

    const { endpoint, query } = typeConfig[type] || typeConfig['page']

    const url = getStrapiURL(`/api/${endpoint}?${query}&filters[slug][$eq]=${slug}`)
    const response = await axios.get(url)

    if (!response.data.data || response.data.data.length === 0) {
        throw new Error(`No ${type} found with slug: ${slug}`)
    }

    console.log(`Revalidated ${type} with slug: ${slug}`)

    return response.data
}