import { useRouter } from 'next/router';
import NextImage from "@/partials/util/NextImage";
import Link from "next/link";
import styles from "@/styles/components/mobileNavLinks.module.css";


const MobileNavLinks = ({ blocks, currentPath, closeModal }) => {
    const router = useRouter();

    if (!blocks) return null;

    // This function will be triggered whenever a link is clicked.
    const handleClick = async (e, href) => {
        e.preventDefault();
        closeModal()
        await router.push(href);
    };

    return blocks.map((block, i) => {
        const { href, title, icon } = block;

        return (
            <Link
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`${styles.link} ${
                    currentPath === href ? `${styles.active}` : ''
                }`}
                key={i}
            >
                {icon ? (
                <figure className={styles.imageContainer}>
                    <NextImage
                    image={icon}
                    className={styles.icon}
                    />
                </figure>
                ) : null}
                <span className={styles.text}>{title}</span>
            </Link>
        );
    });
};

export default MobileNavLinks;