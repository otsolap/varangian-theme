import AccordionItem from "@/partials/blocks/AccordionItem";
import NextImage from "@/partials/util/NextImage";
import styles from "@/styles/components/accordion.module.css";

const Accordion = ({ title, description, image, accordions }) => {
  return ( 
    accordions ? (
      <section className={styles.accordion}>
          {title && (
            <header className={styles.header}>
              {title && <h2>{title}</h2>}
              {description && <p>{description}</p>}
            </header>
          )}
        <div className={styles.wrapper}>
            {accordions.data && (
                <div className={styles.content}>
                  {accordions.data.map((item, i) => (
                      <AccordionItem key={i} {...item.attributes} />
                  ))}
              </div>
            )}
            {image?.data && (
              <figure className={styles.imageContainer}>
                <NextImage className={styles.image} image={image} />
              </figure>
            )}
        </div>
      </section>
  ) : null );
}

export default Accordion