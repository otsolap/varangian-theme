import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faBullseye, faCircleNodes,faCube, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import styles from "@/styles/components/mobileFooter.module.scss";
import useToggle from "@/hooks/useToggleState"
import Offcanvas from "@/components/navigation/Offcanvas";

const MobileFooter = ({ navigation }) => {
  const [showModal, setShowModal] = useToggle(false);
  const router = useRouter();
  const global = navigation.data.attributes
  const PRIMARY_PAGES = 4;

  const icons = {
    bullseye: faBullseye,
    node: faCircleNodes,
    cube: faCube,
    pen: faPenNib,
  };


  const mobileNavigation = global.blocks.slice(0, PRIMARY_PAGES).map((block, i) => {
    const { href, title } = block;
    const icon = icons[block.icon];

    return (
      <Link
        className={router.pathname === href ? "active" : ""}
        href={href}
        key={i}
        passHref
      >{icon ? (
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
  

  return (
    <footer className={`mobile-only ${styles.mobile}`}>
      <div className={styles.menuWrapper}>
        {mobileNavigation}
        <button onClick={() => setShowModal(true)}>
              <FontAwesomeIcon
                  className={styles.icon}
                  aria-label={showModal == false ? 'Open Menu' : 'Close Menu'}
                  icon={showModal == false ? faBars : faXmark}
              />
              <span className={styles.text}>
                  { showModal == false ? 'Open Menu' : 'Close Menu'}
              </span>
          </button>
          <Offcanvas
              navigation={navigation}
              show={showModal}
              closeModal={() => setShowModal(false)}
          />
          </div>
    </footer>
  );
};

export default MobileFooter;
