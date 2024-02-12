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

        await fetchDataByType(model, slug);

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

async function fetchDataByType(type, slug) {
    const typeConfig = {
        'page': {
            endpoint: 'pages',
            query: config.global.API_CONTENT_QUERY
        },
        'service': {
            endpoint: 'services',
            query: config.services.API_SERVICES_CONTENT_QUERY
        },
        'service-type': {
            endpoint: 'service-types',
            query: config.services.API_SERVICE_TYPES_CONTENT_QUERY
        },
        'article': {
            endpoint: 'articles',
            query: config.blog.API_ARTICLE_CONTENT_QUERY
        },
        'author': {
            endpoint: 'authors',
            query: config.blog.API_AUTHORS_CONTENT_QUERY
        },
        'category': {
            endpoint: 'categories',
            query: config.blog.API_CATEGORIES_CONTENT_QUERY
        }
    };

    const { endpoint, query } = typeConfig[type] || typeConfig['page'];

    const url = getStrapiURL(`/api/${endpoint}?${query}&filters[slug][$eq]=${slug}`);
    const response = await axios.get(url);

    if (!response.data.data || response.data.data.length === 0) {
        throw new Error(`No ${type} found with slug: ${slug}`);
    }

    return response.data;
}

function getRoutePrefix(model) {
    switch (model) {
        case 'page':
            return '';
        case 'service':
            return '/services';
        case 'service-type':
            return '/service-types';
        case 'article':
            return '/blog';
        case 'author':
            return '/authors';
        case 'category':
            return '/categories';
        default:
            return '';
    }
}
