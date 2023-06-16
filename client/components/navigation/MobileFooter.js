import Link from "next/link";
import { faPen, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "@/styles/components/mobileFooter.module.scss";

const MobileFooter = ({ navigation }) => {
  const router = useRouter();
  const global = navigation.data.attributes
  const PRIMARY_PAGES = 4;

  const icons = {
    clipboard: faClipboardList,
    pen: faPen,
  };

  console.log(global)

  const mobileNavigation = global.slice(0, PRIMARY_PAGES).map((page, i) => {
    const icon = icons[page.icon];

    return (
      <Link
        className={router.pathname == page.path ? "active" : ""}
        href={page.path}
        key={i}
        passHref
      >
        {icon ? (
          <FontAwesomeIcon
            className={styles.icon}
            aria-label={page.title}
            icon={icon}
          />
        ) : null}
        <span className={styles.text}>{page.title}</span>
      </Link>
    );
  });

  return (
    <footer className={`mobile-only ${styles.mobile}`}>
      <div className={styles.menuWrapper}>
        {mobileNavigation}
        </div>
    </footer>
  );
};

export default MobileFooter;
