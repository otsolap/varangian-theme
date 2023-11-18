import React, { useState, useEffect } from "react";
import styles from "@/styles/components/shareButtons.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ShareButtons = ({ title }) => {
  const router = useRouter();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `https://${host}`;

    setUrl(`${baseUrl}${router.asPath}`);
  }, [router.asPath]);

  return (
      <div className={styles.shareButtons}>
        <h5>Share article:</h5>
        <div className={styles.wrapper}>
          <Link
            href={`mailto:?&subject=${title}!&cc=&bcc=&body=${url}\n${encodeURI(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            passHref
          >
            <FontAwesomeIcon
              className={styles.icon}
              aria-label="Sähköposti"
              icon={faEnvelope}
            />
          </Link>
          <Link
            href={`whatsapp://send?text=${title}-${url}`}
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            passHref
          >
            <FontAwesomeIcon
              className={styles.icon}
              aria-label="Whatsapp"
              icon={faWhatsapp}
            />
          </Link>
          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            passHref
          >
            <FontAwesomeIcon
              className={styles.icon}
              aria-label="LinkedIn"
              icon={faLinkedin}
            />
          </Link>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            passHref
          >
            <FontAwesomeIcon
              className={styles.icon}
              aria-label="Facebook"
              icon={faFacebook}
            />
          </Link>
        </div>
      </div>
  );
};

export default ShareButtons;