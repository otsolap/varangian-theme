import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/components/offcanvas.module.scss'
import useToggle from "@/hooks/useToggle"

const Offcanvas = ({ navigation, show, closeModal }) => {
    const [isBrowser, setIsBrowswer] = useToggle(false);
    const router = useRouter()
    const global = navigation && navigation.data ? navigation.data.attributes : {};
    const AFTER_PRIMARY_PAGES = 4
    let OffcanvasLinks = null;

    useEffect(() => {
        setIsBrowswer(true);
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        closeModal()
    }

    if (global && Array.isArray(global.blocks)) {
      OffcanvasLinks = global.blocks
        .slice(0, AFTER_PRIMARY_PAGES)
        .map((block, i) => {
          const { href, title } = block;
    
          return (
            <li
              onClick={handleClick}
              className={`${styles.linkWrapper} ${
                router.asPath === href ? styles.active : ''
              }`}
              key={i}
            >
              <Link className={styles.link} href={href}>
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
    ) : null

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalComponent,
            document.getElementById('modal-root')
        )
    } else {
        return null
    }
}

export default Offcanvas;