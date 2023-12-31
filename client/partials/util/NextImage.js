import Image from 'next/image';
import { getStrapiMedia } from 'utils/index';

const NextImage = ({ image, width=500, height=500, priority = false,  sizes = '100vw', className }) => {
  if (!image?.data) {
    return null;
  }

  const imageData = Array.isArray(image.data) ? image.data[0].attributes : image.data.attributes;
  const { url, alternativeText } = imageData || {};

  if (!url) {
    return null;
  }

  return (
    <Image 
      src={getStrapiMedia(url)}
      alt={alternativeText || ''}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className || ''}
      placeholder="blur"
      blurDataURL={getStrapiMedia(url)}
    />
  );
};

export default NextImage;
