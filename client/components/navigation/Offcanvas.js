import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/components/offcanvas.module.css'
import useToggle from "@/hooks/useToggle"

const Offcanvas = ({ navigation, show, closeModal }) => {
    const [isBrowser, setIsBrowswer] = useToggle(false);
    const router = useRouter();
    const global = navigation && navigation.data ? navigation.data.attributes : {};
    const AFTER_PRIMARY_PAGES = 3;
    let OffcanvasLinks = null;

    useEffect(() => {
        setIsBrowswer(true);
    }, [])

    const handleClick = async (e, href) => {
        e.preventDefault();
        closeModal();
        await router.push(href);
    };

    if (global && Array.isArray(global.blocks)) {
      OffcanvasLinks = global.blocks
        .slice(AFTER_PRIMARY_PAGES)
        .map((block, i) => {
          const { href, title } = block;
    
          return (
            <li
              className={`${styles.linkWrapper} ${
                router.asPath === href ? styles.active : ''
              }`}
              key={i}
            >
              <Link href={href} onClick={(e) => handleClick(e, href)} className={styles.link}>
                  <span className={styles.text}>{title}</span>
              </Link>
            </li>
          );
        });
    }

    const modalComponent = show ? (
        <div tabIndex="-1" aria-hidden="true" aria-labelledby="Modal" id={styles.modal} className="mobile-only">
            <div className={styles.content}>
                {OffcanvasLinks}
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalComponent,
            document.getElementById('modal-root')
        );
    } else {
        return null;
    }
}

export default Offcanvas;
