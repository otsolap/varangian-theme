import { useContext, useEffect } from "react";
import { GlobalContext } from "@/pages/_app.js";
import axios from "axios"
import { getStrapiURL } from "utils"
import Blocks from "@/components/Blocks";
import config from '@/utils/config'

const Service = ({ service, servicesNavigation  }) => {
  const { setMetaData, setServicesNavigation  } = useContext(GlobalContext);

  useEffect(() => {
    setMetaData({
      metaData: service.seo,
    });

    setServicesNavigation({
      title: service.title,
    });
  
    return () => {
      setMetaData(null); 
      setServicesNavigation(null);
    };
  }, [service, setMetaData, servicesNavigation, setServicesNavigation]);

  return (
     <Blocks blocks={service.blocks} />
  )
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(`${getStrapiURL(`/api/services`)}`)

    if (!response.data) {
      throw new Error('Failed to fetch API data')
    }

    return {
      paths: response.data.data.map((service) => ({
        params: {
          slug: service.attributes.slug,
        },
      })),
       fallback:'blocking'
    }
  } catch (error) {
    console.error('Error fetching services:', error)

    return {
      paths: [],
       fallback:'blocking'
    }
  }
}

export async function getStaticProps({ params }) {
    try {
      const response = await axios.get(getStrapiURL(`/${config.services.API_SERVICES_CONTENT_QUERY}${params.slug}`));
  
      if (!response.data) {
        throw new Error('Failed to fetch API data')
      }

      return {
        props: {
          service: response.data.data[0]?.attributes ?? {},
        },
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
  
      return {
        notFound: true,
      }
    }
  }
  
export default Service