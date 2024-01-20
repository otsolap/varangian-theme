import Head from 'next/head';
import { getStrapiMedia, isNotEmpty } from "@/utils/index";

const SEO = ({ metadata, baseSEO, canonicalUrl }) => {
  // Use metadata if it's available and not empty, otherwise use baseSEO
  let seoData = isNotEmpty(metadata) && metadata.metaData != null ? metadata : baseSEO;

  // Exit if seoData is still not valid
  if (!isNotEmpty(seoData)) return null;

  // Extract the necessary values from seoData
  const { title, description, preventIndexing, keywords, XTwitter, imageBlock } = seoData.metaData || seoData.data.attributes.seo || {};

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
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta httpEquiv="Content-Language" content="en" />
      <link rel="canonical" href={canonicalUrl} />
      {preventIndexing && (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      )}
      {keywords && <meta name="keywords" content={keywords} />}
      {ogImages.map((image, index) => (
        <meta key={index} property="og:image" content={image.url} />
      ))}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {XTwitter && (
        <>
          <meta name="twitter:card" content={ogImages.length > 0 ? 'summary_large_image' : 'summary'} />
          <meta name="twitter:site" content={`@${XTwitter}`} />
          <meta name="twitter:creator" content={`@${XTwitter}`} />
        </>
      )}
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/icons/site.webmanifest" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#001f2a" />
      <meta name="msapplication-TileColor" content="#001f2a" />
      <meta name="theme-color" content="#001f2a" />
    </Head>
  );
};

export default SEO;
