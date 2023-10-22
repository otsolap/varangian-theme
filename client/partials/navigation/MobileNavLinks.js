import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCircleNodes, faCube, faPenNib } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/mobileNavLinks.module.scss";
import { useRouter } from 'next/router';

const icons = {
    bullseye: faBullseye,
    node: faCircleNodes,
    cube: faCube,
    pen: faPenNib,
};

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
        const { href, title } = block;
        const icon = icons[block.icon];

        return (
            <a
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`${styles.link} ${
                    currentPath === href ? `${styles.active}` : ''
                }`}
                key={i}
            >
                {icon ? (
                    <FontAwesomeIcon
                        className={styles.icon}
                        aria-label={title}
                        icon={icon}
                    />
                ) : null}
                <span className={styles.text}>{title}</span>
            </a>
        );
    });
};

export default MobileNavLinks;
