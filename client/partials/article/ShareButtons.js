import React, { useState, useEffect } from "react";
import styles from "@/styles/components/shareButtons.module.scss";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faLinkedin,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const shareMappings = {
  WhatsApp: {
    icon: faWhatsapp,
    getUrl: (title, url) => `whatsapp://send?text=${encodeURIComponent(title)} - ${encodeURIComponent(url)}`,
  },
  X: {
    icon: faXTwitter, 
    getUrl: (title, url) => `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  Link: {
    icon: faLink,
    getUrl: (title, url) => url,
  },
  Email: {
    icon: faEnvelope,
    getUrl: (title, url) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
  LinkedIn: {
    icon: faLinkedin,
    getUrl: (title, url) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  },
  Facebook: {
    icon: faFacebook,
    getUrl: (title, url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
};

const ShareButtons = ({ title, settings }) => {
  const router = useRouter();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `https://${host}`;
    setUrl(`${baseUrl}${router.asPath}`);
  }, [router.asPath]);

  return (
    <div className={styles.shareButtons}>
      <h5 className={styles.title}>Share article:</h5>
      <div className={styles.wrapper}>
        {Object.entries(shareMappings).map(([key, { icon, getUrl }]) => (
          settings[key] && (
            <a
              key={key}
              href={getUrl(title, url)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <FontAwesomeIcon
                className={styles.icon}
                aria-label={key}
                icon={icon}
              />
            </a>
          )
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
