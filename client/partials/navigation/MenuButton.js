import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/menuButton.module.css";

const MenuButton = ({ isMenuOpen, toggleMenu }) => {
    return (
        <button className={styles.toggle} onClick={toggleMenu}>
            <FontAwesomeIcon
                className={styles.icon}
                aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                icon={isMenuOpen ? faXmark : faBars}
            />
            <span className={styles.text}>
                {isMenuOpen ? 'Close Menu' : 'Open Menu'}
            </span>
        </button>
    );
};

export default MenuButton;
