import styles from "@/styles/components/mediaMix.module.scss";
import MediaMixItem from "@/partials/blocks/MediaMixItem";

const MediaMix = ({ mediaMixItems }) => {
  return (
      <section className={styles.mediaMix}>
        <div className={styles.wrapper}>
          {mediaMixItems ? mediaMixItems.map((item, i) => {
            return (
              <MediaMixItem
                key={i}
                type={item.type}
                image={item.image}
                video={item.video}
                markdown={item.markdown}
                buttons={item.buttons}
              />
            );
          }): null}
        </div>
      </section>
  );
};

export default MediaMix;
