import { NextSeo } from "next-seo";
import { getStrapiMedia } from "@/utils/index";

const SEO = ({ metadata, canonicalUrl }) => {
  // Check for metadata, return null if not available
  if (!metadata) return null;

  const { metaData: { title, description, preventIndexing, keywords, XTwitter, imageBlock } } = metadata;
  // Deconstructing the image formats if imageBlock exists
  const imageFormats = imageBlock?.image?.data?.attributes?.formats;

  // Generate the images array for openGraph using imageFormats
  const ogImages = imageFormats ? Object.values(imageFormats).map((image) => ({
    url: getStrapiMedia(image.url),
    width: image.width,
    height: image.height,
    alt: title, 
  })) : [];

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonicalUrl}
      noindex={preventIndexing}
      nofollow={preventIndexing}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: keywords || '',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          httpEquiv: 'x-ua-compatible',
          content: 'ie=edge',
        }
      ]}
      openGraph={{
        title,
        description,
        url: canonicalUrl,
        type: 'website',
        images: ogImages,
      }}
      twitter={{
        handle:`@${XTwitter}`,
        site: `@${XTwitter}`,
        cardType: ogImages.length > 0 ? 'summary_large_image' : 'summary',
      }}
    />
  );
};

export default SEO;
