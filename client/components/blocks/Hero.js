import React from "react";
import NextImage from "@/partials/util/NextImage"
import CustomLink from "@/partials/util/CustomLink";
import styles from "@/styles/components/hero.module.scss";
import YoutubeEmbed from "@/partials/util/YoutubeEmbed";


const Hero = ({ image, alignContent, autoplay,  media, mediaWidth, title, video, description, buttons }) => {
  return (
      <div className={styles.hero}>
        <div
          className={`
          ${styles.mediaContainer} 
          ${alignContent == "left" ? styles.mediaLast : styles.mediaFirst} 
          ${media == "video" && mediaWidth ? styles.fullVideo : ""} 
          `}
        >
          {media == "image" && image.data ? (
            mediaWidth ? (
              <NextImage
                className={styles.fullImage}
                image={image}
              />
            ) : (
              <NextImage
                className={styles.image}
                image={image}
              />
            )
          ): null}
          {media == "video" && video ? (
            <YoutubeEmbed
              autoplay={autoplay}
              className={styles.video}
              src={video}
            />
          ): null}
        </div>
        <div
          className={`
          ${styles.contentContainer} 
          ${alignContent == "left" ? styles.contentFirst : styles.contentLast} 
        `}
        >
          <article className={styles.content}>
            {title && <h1>{title}</h1>}
            {description && <h3>{description}</h3>}
            {buttons && (
              <div className={styles.buttonWrapper}>
                {buttons.map((button, i) => (
                  <CustomLink link={button} key={i} className={`button button--${button.selectTheme}`} />
                ))}
              </div>
            )}
          </article>
        </div>
      </div>

  );
};

export default Hero;