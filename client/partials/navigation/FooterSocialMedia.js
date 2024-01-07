import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useToggle from '@/hooks/useToggle';
import ContactDetails from '@/partials/util/ContactDetails'
import styles from '@/styles/components/footer.module.scss';

const FooterSocialMedia = ({  id, open, title, socialMedia }) => {
    const contentRef = useRef(null)
    const [active, setActive] = useToggle(open)
    useEffect(() => {
        contentRef.current.style.maxHeight = active
            ? `${contentRef.current.scrollHeight}px`
            : "0px";
    }, [contentRef, active]);

    const toggleAccordion = () => {
        setActive(!active);
    };

    return (
        <div key={id} className={styles.column}>
        <div className={styles.toggle} onClick={toggleAccordion}>
                <div className={styles.wrapper}>
                    <div className={active ? `${styles.open}` : `${styles.closed}`}>
                        <div className={styles.flexBox}>
                            {title && <h4 className={styles.heading}>{title}</h4>}
                            <FontAwesomeIcon className={styles.icon} aria-label="Additional information on Footer" icon={active ? faAngleUp : faAngleDown} />
                        </div>
                    </div>
                    <div ref={contentRef} className={active ? `${styles.content} ${styles.contentDivider}` : `${styles.content}`} >
                        <ContactDetails list={socialMedia} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSocialMedia