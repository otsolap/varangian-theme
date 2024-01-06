import styles from "@/styles/components/articleAndServices.module.scss";
import ServiceItem from "partials/blocks/ServiceItem";
import Link from "next/link";
import config from '@/utils/config'

export default function ServiceSection({ title, description, selectTheme, services}) {
  return (
    <section className={selectTheme == 'primary' ? styles.bgPrimary : styles.bgSecondary}>
      {title || description ? (
        <header className={styles.header}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      ) : null}
      {services?.data?.length ? (
        <div className={styles.wrapper}>
          {services.data.map((item, i) => {
            return (
              <ServiceItem
                key={i}
                image={item.attributes.image}
                title={item.attributes.title}
                description={item.attributes.description}
                price={item.attributes.price}
                serviceType={item.attributes.service_type.data?.attributes}
                slug={item.attributes.slug}
              />
            );
          })}
        </div>
      ) : null}
      <footer className={styles.linkWrapper}>
      <Link className={styles.archiveLink} href={`/${config.services.SERVICE_PATH}`}>
          {config.blocks.CONTENT_SERVICES_SECTION_SERVICES_ARCHIVE_LEAD}
       </Link>
      </footer>
    </section>
  );
};
