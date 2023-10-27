import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/accordion.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AccordionItem = ({ title, body, open }) => {
  const contentRef = useRef(null);
  const [active, setActive] = useState(open);
  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (
    <div role="button" className={`${styles.toggle} ${active ? styles.activeToggle : styles.inactiveToggle}`} onClick={toggleAccordion}>
      <div className={styles.item}>
        <div className={styles.flexBox}>
          <h4 className={styles.heading}>{title}</h4>
          <FontAwesomeIcon
            className={`${styles.icon} ${active ? styles.iconLeft : styles.iconDown}`}
            aria-label="Usein kysytty kysymys"
            icon={faAngleDown}
          />
        </div>
        <div
          ref={contentRef}
          className={
            active ? `${styles.answer} ${styles.divider}` : `${styles.answer}`
          }
        >
          <p className={styles.text}>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
