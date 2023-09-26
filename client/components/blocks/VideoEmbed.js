import YoutubeEmbed from "@/partials/util/YoutubeEmbed";
import styles from '@/styles/components/videoEmbed.module.scss'

const VideoEmbed = ({ url }) => {
  return (url ? (
        <section className={styles.videoContainer}>
          <YoutubeEmbed url={url} />
        </section>
      ): null
  );
};

export default VideoEmbed;
