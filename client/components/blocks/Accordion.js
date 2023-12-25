import AccordionItem from "@/partials/blocks/AccordionItem";
import NextImage from "@/partials/util/NextImage";
import styles from "@/styles/components/accordion.module.scss";

const Accordion = ({ title, description, image, accordions }) => {
  return (
    <section className={styles.accordion}>
        {title && (
          <header className={styles.header}>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </header>
        )}
      <div className={styles.wrapper}>
          {image?.data && (
            <figure className={styles.imageContainer}>
              <NextImage className={styles.image} image={image} />
            </figure>
          )}
          {accordions.data && (
              <div className={styles.content}>
                {accordions.data.map((item, i) => (
                    <AccordionItem key={i} {...item.attributes} />
                ))}
            </div>
          )}
      </div>
    </section>
  )
}

export default Accordion