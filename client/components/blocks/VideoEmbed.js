import YoutubeEmbed from "@/partials/util/YoutubeEmbed";
import styles from '@/styles/components/videoEmbed.module.scss'

const VideoEmbed = ({ url }) => {
  return (url ? (
        <div className={styles.videoContainer}>
          <YoutubeEmbed url={url} />
        </div>
      ): null
  );
};

export default VideoEmbed;
