import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/components/offcanvas.module.scss'
import useToggle from "@/hooks/useToggleState"

const Offcanvas = ({ navigation, show, closeModal }) => {
    const [isBrowser, setIsBrowswer] = useToggle(false);
    const router = useRouter()
    const global = navigation.data.attributes
    const AFTER_PRIMARY_PAGES = 4

    useEffect(() => {
        setIsBrowswer(true);
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        closeModal()
    }

    const OffcanvasLinks = global.blocks.slice(0, AFTER_PRIMARY_PAGES).map((block, i) => {
        const { href, title } = block;

        return (
            <li
                onClick={handleClick}
                className={`${styles.linkWrapper} ${router.asPath === href ? styles.active : ''}`}
                key={i}
            >
                <Link 
                className={styles.link}
                href={href}
                >
                        <span className={styles.mobileLinkText}>{title}</span>
                </Link>
            </li>
        )
    })

    const modalComponent = show ? (
        <div tabIndex="-1" aria-hidden="true" aria-labelledby="Modal" id={styles.modal} className="mobile-only">
            <div className={styles.modalContent}>
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