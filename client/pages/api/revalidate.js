export default async function handler(req, res) {
    if (req.query.secret !== process.env.NEXT_REVALIDATION_TOKEN && !req.headers['x-strapi-webhook'] || req.headers['x-strapi-webhook'].toLowerCase() !== 'true') {
        return res.status(401).json({ message: 'Invalid request origin' });
    }
    
    const bodyData = JSON.parse(req.body);
    const { event, model } = bodyData;

    let pathToRevalidate;

    if (['entry.create', 'entry.update', 'entry.delete'].includes(event)) {
      if (model === 'article') {
        pathToRevalidate = '/blog';
      } else if (model === 'category') {
        pathToRevalidate = '/category';
      }
    }

    if (!pathToRevalidate) {
      return res.status(400).json({ message: 'Invalid webhook data or unsupported collection type' });
    }

    try {
      await res.revalidate(pathToRevalidate);
      return res.json({ revalidated: true });
    } catch (err) {
      console.error("Error during revalidation:", err);  // Log the error
      return res.status(500).send('Error revalidating: ' + err.message); // Return a more detailed error message
    }
}
