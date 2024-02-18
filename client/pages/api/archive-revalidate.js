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
            return res.status(400).json({ message: 'Invalid model for archive type revalidation.' });
        }

        const pathToRevalidate = getRouter(model);

        await res.revalidate(pathToRevalidate);
        console.log(`Successfully revalidated ${model} with slug: ${pathToRevalidate}`);

        return res.json({ revalidated: true, pathToRevalidate });
    } catch (error) {
        console.error("Error during revalidation:", error.message);
        return res.status(500).json({ message: error.message });
    }
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
