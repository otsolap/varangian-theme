import axios from 'axios';
import { getStrapiURL } from '@/utils/index';
import config from '@/utils/config';

export default async function revalidate(req, res) {
    const webhookHeader = req.headers['x-strapi-revalidate-webhook'];

    if (webhookHeader && webhookHeader !== 'true') {
        return res.status(401).json({ message: 'Unauthorized: Invalid or missing required header value.' });
    }

    const { secret } = req.query

    if (secret !== process.env.NEXT_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid secret' })
    }

    try {
        const {  model, entry } = req.body;

        if (!model) {
            return res.status(400).json({ message: 'Model is missing in the webhook payload.' });
        }

        const { slug } = entry;

        if (!slug) {
            return res.status(400).json({ message: 'Slug is missing in the webhook payload.' });
        }

        const routePrefix = getRoutePrefix(model);

        const pathToRevalidate = routePrefix + (slug === '/' ? '/' : `/${slug}`);

        await res.revalidate(pathToRevalidate);
        console.log(`Successfully revalidated ${model} with slug: ${pathToRevalidate}`);

        return res.json({ revalidated: true, slug });
    } catch (error) {
        console.error("Error during revalidation:", error.message);
        return res.status(500).json({ message: error.message });
    }
}


function getRoutePrefix(model) {
    switch (model) {
        case 'page':
            return '';
        case 'service':
            return '/services';
        case 'service-type':
            return '/service-type';
        case 'article':
            return '/blog';
        case 'author':
            return '/authors';
        case 'category':
            return '/category';
        default:
            return '';
    }
}
