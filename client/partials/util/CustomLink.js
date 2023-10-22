import Link from "next/link";

const CustomLink = ({ link, className }) => {
  // null identifier
  if(link?.href === null || link?.href === undefined || link?.href?.length === 0) {
    return
  }

  // <a> for external links
  if (link.isExternal) {
    return (
      <a href={link.href} className={`${link.selectTheme ? `color-${link.selectTheme}` : ''} ${className || ''}`} target="_blank" rel="noreferrer">
        {link.title}
      </a>
    )
  }

  // if target is blank
  if(link.target === '_blank') {
    return (
      <Link href={link.href} target="_blank" rel="noopener noreferrer" className={`${link.selectTheme ? `color-${link.selectTheme}` : ''} ${className || ''}`}>
          {link.title}
      </Link>
    )
  }

  return <Link href={link.href} className={`${link.selectTheme ? `color-${link.selectTheme}` : ''} ${className || ''}`} >{link.title}</Link>;
};

export default CustomLink;
