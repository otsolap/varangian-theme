import styles from '@/styles/pages/error.module.scss'
import Link from "next/link";

export default function Custom404() {
    return (
        <section>
            <header className={styles.padding}>
                <h1>404 - Page Not Found</h1>
            </header>
            <article className={styles.padding}>
                <p>Unfortunately, the page you were looking for cannot be found &ndash; it might have been moved or deleted. If you typed the address directly into the browser&apos;s address bar, you might want to double-check to make sure that no typing errors have slipped in.</p>
                <p>Links that could help you track down the content you&apos;re looking for:</p>
                <div className={styles.buttonWrapper}>
                    <Link className={'button button--primary'} href="/">Home</Link>
                </div>
            </article>
        </section>
    )
  }
