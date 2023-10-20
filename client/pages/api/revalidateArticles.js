export default async function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_ARTICLES_REVALIDATION_TOKEN || !req.headers['strapi-article-webhook'] || req.headers['strapi-article-webhook'] !== 'true') {
      return res.status(401).json({ message: 'Invalid request origin' })
  }

  const allowedPages = ['blog', 'category']
  const pageToRevalidate = req.query.slug

  if (!allowedPages.includes(pageToRevalidate)) {
      return res.status(400).json({ message: 'Invalid or unsupported page type' })
  }

  const pathToRevalidate = `/${pageToRevalidate}`

  try {
    await res.revalidate(pathToRevalidate)
    return res.json({ revalidated: true })
  } catch (err) {
    console.error("Error during revalidation:", err)
    return res.status(500).send('Error revalidating: ' + err.message) 
  }
}
