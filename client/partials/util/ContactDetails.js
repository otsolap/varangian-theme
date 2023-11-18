import styles from "@/styles/components/contactDetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faPinterest,
  faLinkedin,
  faTelegramPlane,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";

// Define the mapping from contact type to icon and URL prefix
const contactMappings = {
  Email: { icon: faEnvelope, prefix: 'mailto:' },
  Facebook: { icon: faFacebook, prefix: 'https://www.facebook.com/' },
  Instagram: { icon: faInstagram, prefix: 'https://www.instagram.com/' },
  X: { icon: faXTwitter, prefix: 'https://x.com/' },
  Pinterest: { icon: faPinterest, prefix: 'https://www.pinterest.com/' },
  LinkedIn: { icon: faLinkedin, prefix: 'https://www.linkedin.com/in/' },
  Telegram: { icon: faTelegramPlane, prefix: 'https://t.me/' },
  WhatsApp: { icon: faWhatsapp, prefix: 'https://wa.me/' },
  Link: { icon: faLink, prefix: '' }, // No prefix for general links
};

const ContactDetails = ({ list }) => {
  const contactInfo = list.map((contact, index) => {
    // Get the correct prefix for the contact type if available, or default to the URL provided
    const urlPrefix = contactMappings[contact.type]?.prefix || '';
    const href = contact.type === 'Link' ? contact.url : `${urlPrefix}${contact.url}`;

    return (
      <p className={styles.contactText} key={index}>
        {contactMappings[contact.type] && (
          <a
            className={styles.someLink}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              aria-label={contact.type}
              icon={contactMappings[contact.type].icon}
              className={styles.socialIcon}
            />
            {contact.title}
          </a>
        )}
      </p>
    );
  });

  return <>{contactInfo}</>;
};

export default ContactDetails;
