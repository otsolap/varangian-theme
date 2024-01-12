import styles from "@/styles/components/header.module.css";
import { useRouter } from 'next/router';
import CustomLink from "@/partials/util/CustomLink";

const MenuItem = ({ title, href,}) => {
  const router = useRouter();
  const link = {
    href,
    title
  };

  return (
    <CustomLink className={`${styles.link} ${
      router.asPath === href ? `${styles.active}` : ''
  }` }link={link} />
  );
};

export default MenuItem;