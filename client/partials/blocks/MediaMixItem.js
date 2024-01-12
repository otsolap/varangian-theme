import styles from "@/styles/components/mediaMix.module.css";
import NextImage from "@/partials/util/NextImage";
import MarkdownBlock from "@/partials/util/MarkdownBlock";
import YoutubeEmbed from "@/partials/util/YoutubeEmbed";

const MediaMixItem = ({ type, image, video, markdown}) => {
  return (
    <div className={styles.mediaMixColumn}>
      {type == "video" && video ? (
        <div className={styles.videoContainer}>
          <YoutubeEmbed url={video} />
        </div>
      ): null}
      {type == "image" && image.data ? (
        <figure className={styles.imageContainer}>
          <NextImage
            image={image}
            className={styles.image}
            width={668}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </figure>
      ): null}
      {type == "markdown" && markdown && (
         <MarkdownBlock markdown={markdown} />
      )}
    </div>
  );
};

export default MediaMixItem;
