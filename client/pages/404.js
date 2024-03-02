import styles from '@/styles/pages/error.module.css'
import MarkdownBlock from "@/partials/util/MarkdownBlock";
import CustomLink from "partials/util/CustomLink";
import { getStrapiURL } from "@/utils/index"
import axios from "axios"
import config from '@/utils/config'

const Custom404 = ({ title, description, buttons}) => {
    return (
        <section>
            <header>
               {title && <h1>{title}</h1>}
            </header>
            {description && <MarkdownBlock markdown={description} />}
            {buttons && (
              <div className={styles.buttonWrapper}>
                {buttons.map((button, i) => (
                  <CustomLink link={button} key={i} className={`button button--${button.selectTheme}`} />
                ))}
              </div>
            )}
        </section>
    )
  }

export async function getStaticProps() {
    try {
      const response = await axios.get(getStrapiURL(`/${config.global.API_NOT_FOUND_QUERY}`));
  
      if (!response.data) {
        throw new Error('Failed to fetch API data')
      }

      return {
        props: {
            title: response.data.data.attributes.title ?? {},
            description: response.data.data.attributes.description ?? {},
            buttons: response.data.data.attributes.buttons ?? {},
        },
      }
    } catch (error) {
      console.error('Error fetching not-found data:', error);
  
      return {
        props: {
            title: "404 - Page Not Found",
            description:"Unfortunately, the page you were looking for cannot be found it might have been moved or deleted. If you typed the address directly into the browsers address bar, you might want to double-check to make sure that no typing errors have slipped in.\n\nLinks that could help you track down the content you're looking for",
            buttons: [{"href":"/","title":"Home","isExternal":false,"target":null,"selectTheme":"primary"}],
        },
      }
    }
  }
  
  export default Custom404