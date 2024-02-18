import { getStrapiURL } from "@/utils/index"
import axios from "axios"

export default async function globalRevalidate(req, res) {
    const webhookHeader = req.headers['x-strapi-revalidate-webhook'];

    if (webhookHeader && webhookHeader !== 'true') {
        return res.status(401).json({ message: 'Unauthorized: Invalid or missing required header value.' });
    }

    const { secret } = req.query

    if (secret !== process.env.NEXT_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid secret' })
    }

    try {
        const {  model  } = req.body;

        if (!model) {
            return res.status(400).json({ message: 'Model is missing in the webhook payload.' });
        }

        const validModels = [
            'base-seo',
            'footer', 
            'navigation',
            'services-banner',
            'subscribe-form', 
        ];

        if (!validModels.includes(model)) {
            return res.status(400).json({ message: 'Invalid model for global revalidation.' });
        }


        getAllPages().then(routes => {
            routes.forEach(route => {
                res.revalidate(route);
            });
        });
        console.log(`Successfully revalidated entire app due to model: ${model}`);

        return res.json({ revalidated: true, model });
    } catch (error) {
        console.error("Error during global revalidation:", error.message);
        return res.status(500).json({ message: error.message });
    }
}

async function getAllPages() {
    try {
        const responses = await Promise.all([
            axios.get(getStrapiURL(`/api/pages`)),
            axios.get(getStrapiURL(`/api/articles`)),
            axios.get(getStrapiURL(`/api/services`)),
        ]);

        const slugs = responses.map(response => response.data.map(item => item.attributes.slug));
        const types = ['page', 'article', 'service'];

        const routes = slugs.flat().map((slug, index) => {
            const type = types[index % types.length];
            const prefix = getRoutePrefix(type);
            return `${prefix}/${slug}`;
        });

        return routes;
    } catch (error) {
        console.error("Error during fetching pages:", error.message);
        return []; // Return an empty array in case of error
    }
}


function getRoutePrefix(type) {
    switch (type) {
        case 'page':
            return '';
        case 'service':
            return '/services';
        case 'article':
            return '/blog';
        default:
            return '';
    }
}