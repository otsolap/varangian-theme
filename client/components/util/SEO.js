import { NextSeo } from "next-seo";
import { getStrapiMedia } from "@/utils/index";

const SEO = ({ metadata }) => {
  // Check for metadata, return null if not available
  if (!metadata) return null;

  const { title, description, imageBlock, preventIndexing, keywords } = global;
  const imageFormats = imageBlock?.image?.data?.attributes?.formats;

  return (
    <NextSeo
      title={title}
      description={description}
      noindex={preventIndexing}
      nofollow={preventIndexing}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: keywords?.join(', ') || '',
        },
      ]}
      openGraph={{
        title,
        description,
        ...(imageFormats && {
          images: Object.values(imageFormats).map((image) => ({
            url: getStrapiMedia(image.url),
            width: image.width,
            height: image.height,
          })),
        }),
      }}
    />
  );
};

export default SEO
