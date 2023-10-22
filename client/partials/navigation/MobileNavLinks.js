import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCircleNodes,faCube, faPenNib } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/mobileNavLinks.module.scss";

const icons = {
    bullseye: faBullseye,
    node: faCircleNodes,
    cube: faCube,
    pen: faPenNib,
};

const MobileNavLinks = ({ blocks, currentPath }) => {
    if (!blocks) return null;

    return blocks.map((block, i) => {
        const { href, title } = block;
        const icon = icons[block.icon];

        return (
            <Link
                className={`${styles.link} ${
                    currentPath === href ? `${styles.active}` : ''
                }`}
                href={href}
                key={i}
                passHref
            >
                {icon ? (
                    <FontAwesomeIcon
                        className={styles.icon}
                        aria-label={title}
                        icon={icon}
                    />
                ) : null}
                <span className={styles.text}>{title}</span>
            </Link>
        );
    });
};

export default MobileNavLinks;