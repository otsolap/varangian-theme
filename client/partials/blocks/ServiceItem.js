import styles from "@/styles/components/articleAndServices.module.scss";
import NextImage from "@/partials/util/NextImage";
import Link from "next/link";
import config from '@/utils/config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faDollarSign } from "@fortawesome/free-solid-svg-icons";

const ServiceItem = ({ image, title, price, currency, slug, serviceType }) => {

  return (
      <article className={styles.item}>
        {image.data &&
            <figure className={styles.imageContainer}>
                <Link aria-label={`Learn more about ${title}`} className={styles.imageLink}  href={`/${config.services.SERVICES_PATH}/${slug}`}>
                  <NextImage image={image} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className={styles.image}/>
                </Link>
            </figure>
        }
        {title && 
          <Link href={`/${config.services.SERVICES_PATH}/${slug}`}>
              <h3 className={styles.title}>{title}</h3>
          </Link>
        }
        {serviceType?.data || price? (
          <footer className={`${styles.footer} ${styles.footerRow}`}>
            {serviceType && <h4 className={styles.category}>{serviceType.title}</h4>}
            {price && 
              <p className={styles.price}>
                <FontAwesomeIcon className={styles.currency} aria-label="currency" icon={currency === 'euro' ? faEuroSign : faDollarSign} />
                {price}
              </p>
            }
          </footer>
        ): null}
      </article>
  );
};

export default ServiceItem;
