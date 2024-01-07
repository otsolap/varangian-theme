import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '@/styles/components/taxonomyLinks.module.scss';
import config from '@/utils/config';

function TaxonomyLinks({ categories, service_types }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1440);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);

  const data = categories || service_types;
  const isCategory = categories != null;

  const getPath = (item) => {
    const baseSlug = item.attributes.slug;
    return isCategory
      ? `/${config.blog.CATEGORY_PATH}/${baseSlug}`
      : `/${config.services.SERVICE_TYPES_PATH}/${baseSlug}`;
  };

  const renderItem = (item, id) => (
    <li className={styles.item} key={id}>
      <Link className={`button ${styles.button}`} href={getPath(item)}>
        {item.attributes.title}
      </Link>
    </li>
  );

  const renderSelectOption = (item, id) => (
    <option value={getPath(item)} key={id}>
      {item.attributes.title}
    </option>
  );

  const renderLinks = () => {
    if (isDesktop) {
      return (
        <ul className={styles.wrapper}>
          {data.map((item, id) => renderItem(item, id))}
        </ul>
      );
    } else {
      return (
        <select
          className={`button ${styles.select}`}
          onChange={(e) => {
            window.location.href = e.target.value;
          }}
        >
          {data.map((item, id) => renderSelectOption(item, id))}
        </select>
      );
    }
  };

  return renderLinks();
}

export default TaxonomyLinks;