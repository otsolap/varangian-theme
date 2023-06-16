import Link from "next/link";
import { faPen, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "@/styles/components/mobileFooter.module.scss";

const MobileFooter = ({ navigation }) => {
  const router = useRouter();
  const global = navigation.data.attributes
  const PRIMARY_PAGES = 4;

  const mobileNavigation = global.blocks.slice(0, PRIMARY_PAGES).map((block, i) => {
    const { href, title } = block;
    return (
      <Link
        className={router.pathname === href ? "active" : ""}
        href={href}
        key={i}
        passHref
      >
        <span className={styles.text}>{title}</span>
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
