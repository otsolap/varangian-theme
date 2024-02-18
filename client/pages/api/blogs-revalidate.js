import { getStrapiURL } from "@/utils/index"
import axios from "axios"

export default async function globalRevalidate(req, res) {
    const webhookHeader = req.headers['x-strapi-revalidate-webhook']

    if (webhookHeader && webhookHeader !== 'true') {
        return res.status(401).json({ message: 'Unauthorized: Invalid or missing required header value.' })
    }

    const { secret } = req.query

    if (secret !== process.env.NEXT_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid secret' })
    }

    try {
        const {  model  } = req.body

        if (!model) {
            return res.status(400).json({ message: 'Model is missing in the webhook payload.' })
        }

        const validModels = [
            'author',
            'blog-navigation',
            'newsletter-banner', 
        ]

        if (!validModels.includes(model)) {
            return res.status(400).json({ message: 'Invalid model for blogs revalidation.' })
        }

        getAllArticles().then(routes => {
            routes.forEach(route => {
                res.revalidate(route)
            })
        })
        console.log(`Successfully revalidated all articles due to model: ${model}`)

        return res.json({ revalidated: true, model })
    } catch (error) {
        console.error("Error during global revalidation:", error.message)
        return res.status(500).json({ message: error.message })
    }
}

async function getAllArticles() {
    try {
        const response = await  axios.get(getStrapiURL(`${config.revalidate.ARTICLES_PATH}`))
        const slugs = response.data.data.map(item => item.attributes.slug)

        const routes = slugs.map(slug => `/blog/${slug}`)

        return routes
    } catch (error) {
        console.error("Error during fetching articles:", error.message)
        return [] // Return an empty array in case of error
    }
}

