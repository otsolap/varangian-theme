import { fetchGlobalData } from "@/utils/index"

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
            'blog-navigation',
            'footer', 
            'navigation',
            'newsletter-banner',
            'services-banner',
            'subscribe-form', 
        ];

        if (!validModels.includes(model)) {
            return res.status(400).json({ message: 'Invalid model for global revalidation.' });
        }

        await fetchGlobalData();

        await res.revalidate('/');
        console.log(`Successfully revalidated entire app for model: ${model}`);

        return res.json({ revalidated: true, model });
    } catch (error) {
        console.error("Error during global revalidation:", error.message);
        return res.status(500).json({ message: error.message });
    }
}
