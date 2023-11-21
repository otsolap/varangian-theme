import { NextSeo } from "next-seo";
import { getStrapiMedia, isNotEmpty } from "@/utils/index";

const SEO = ({ metadata, baseSEO, canonicalUrl }) => {
  // Use metadata if it's available and not empty, otherwise use baseSEO
  let seoData = isNotEmpty(metadata) && metadata.seo != null ? metadata : baseSEO;

  // Exit if seoData is still not valid
  if (!isNotEmpty(seoData)) return null;

  // Initialize default values
  let title, description, preventIndexing, keywords, XTwitter, imageBlock;

  // Determine the structure of seoData and extract values
  if (seoData?.data?.attributes?.seo) {
    // BaseSEO structure
    ({ seo: { title, description, preventIndexing, keywords, XTwitter, imageBlock } } = seoData.data.attributes);
  } else if (seoData?.metaData) {
    // Page-specific SEO structure
    ({ metaData: { title, description, preventIndexing, keywords, XTwitter, imageBlock } } = seoData);
  }

  console.log(title, description, preventIndexing, keywords, XTwitter, imageBlock)
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