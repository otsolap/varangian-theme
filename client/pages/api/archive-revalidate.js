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
        const {  model } = req.body;

        if (!model) {
            return res.status(400).json({ message: 'Model is missing in the webhook payload.' });
        }

        const validModels = [
            'article-archive-page',
            'service-archive-page'
        ];

        if (!validModels.includes(model)) {
            return res.status(400).json({ message: 'Invalid model for collection type revalidation.' });
        }

        await fetchDataByType(model);

        const pathToRevalidate = getRouter(model);

        await res.revalidate(pathToRevalidate);
        console.log(`Successfully revalidated ${model} with slug: ${pathToRevalidate}`);

        return res.json({ revalidated: true, pathToRevalidate });
    } catch (error) {
        console.error("Error during revalidation:", error.message);
        return res.status(500).json({ message: error.message });
    }
}

async function fetchDataByType(type) {
    const typeConfig = {
        'service-archive-page': {
            endpoint: 'services',
            query: config.services.API_ARCHIVE_PAGE_QUERY
        },
        'article-archive-page': {
            endpoint: 'articles',
            query: config.blog.API_ARCHIVE_PAGE_QUERY
        },
    };

    const { endpoint, query } = typeConfig[type];

    const url = getStrapiURL(`/api/${endpoint}?${query}`);
    const response = await axios.get(url);

    if (!response.data.data || response.data.data.length === 0) {
        throw new Error(`No ${type} found with slug: ${slug}`);
    }

    return response.data;
}

function getRouter(model) {
    switch (model) {
        case 'service-archive-page':
            return '/services';
        case 'article-archive-page':
            return '/blog';
        default:
            return '';
    }
}
