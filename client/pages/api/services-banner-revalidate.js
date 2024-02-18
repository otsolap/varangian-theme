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
            'services-banner',
        ];

        if (!validModels.includes(model)) {
            return res.status(400).json({ message: 'Invalid model for global revalidation.' });
        }

        getPagesWithServicesBanner().then(routes => {
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

async function getPagesWithServicesBanner() {
    try {
        const responses = await axios.get(getStrapiURL(`${config.revalidate.SERVICES_BANNER_PATH}`))

        const routes = responses.flatMap((response, index) => {
            const slugs = response.data.data.map(item => item.attributes.slug);
            return slugs.map(slug => {
                if (slug === '/') {
                    return '/';
                }
                return `/${slug}`;
            });
        });

        return routes;
    } catch (error) {
        console.error("Error during fetching pages:", error.message);
        return []; // Return an empty array in case of error
    }
}
