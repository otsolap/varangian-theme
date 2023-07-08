import { getStrapiMedia } from "utils/index";
import Image from "next/image";

const NextImage = ({ image, className }) => {
  let imageData = null;

  if (image && image.data) {
    if (image.data.length > 0) {
      imageData = Array.isArray(image.data) ? image.data[0].attributes : image.data.attributes;
    } else {
      imageData = image.data.attributes;
    }
  } else if (image && image.attributes) {
    imageData = image.attributes;
  }

  if (!imageData) {
    return null;
  }

  const { url, width, height, alternativeText } = imageData;

  if(width && height) {
    return (
      <Image 
        src={getStrapiMedia(url)}
        alt={alternativeText || ""}
        width={width}
        height={height}
        priority
        quality={100}
        className={className || ''}
      />
    )
  }

  return (
    <Image
      src={getStrapiMedia(url)}
      alt={alternativeText || ""}
      fill
      sizes="100vw"
      priority
      quality={100}
      className={className || ''}
    />
  );
};

export default NextImage;