import React from "react";
import NextImage from "@/partials/util/NextImage"
import CustomLink from "@/partials/util/CustomLink";
import styles from "@/styles/components/hero.module.css";
import YoutubeEmbed from "@/partials/util/YoutubeEmbed";


const Hero = ({ image, alignContent, autoplay,  media, mediaWidth, title, video, description, buttons }) => {
  return (
      <div className={styles.hero}>
        <div
          className={`
          ${styles.mediaContainer} 
          ${alignContent == "left" ? styles.mediaLast : styles.mediaFirst} 
          ${mediaWidth ? styles.fullWrapper : ""} 
          `}
        >
          {media == "image" && image.data ? (
              <NextImage
                className={styles.image}
                image={image}
                priority={true}
                height={560}
                width={mediaWidth ? 1440 : 720}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
              />
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