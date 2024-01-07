import axios from "axios"
import { getStrapiURL } from "@/utils/index"
import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/services/ArchiveSection"
import config from '@/utils/config'

const ServiceType = ({ hero, items, service_types }) => {
  return  (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} service_types={service_types} />
    </>
  )
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(`${getStrapiURL(`/${config.services.API_SERVICE_TYPES_PATH_QUERY}`)}`)

    if (!response.data) {
      throw new Error("Failed to fetch API data")
    }

    return {
      paths: response.data.data.map((service_type) => ({
        params: {
          slug: service_type.attributes.slug,
        },
      })),
      fallback: false,
    }
  } catch (error) {
    console.error("Error fetching service_type:", error)

    return {
      paths: [],
      fallback: false,
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const [serviceTypeResponse, allServiceTypes] = await Promise.all([
      axios.get(getStrapiURL(`/${config.services.API_SERVICE_TYPES_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`)),
      axios.get(getStrapiURL(`/${config.services.API_SERVICE_TYPES_PATH_QUERY}`)),
    ])

    const matchingServiceType = serviceTypeResponse.data.data.find(
      (service_type) => service_type.attributes.slug === params.slug
    )
    return {
      props: {
        hero: matchingServiceType.attributes.hero ?? {},
        items: matchingServiceType.attributes.services.data ?? {},
        service_types: allServiceTypes.data.data ?? {},
      },
    }
  } catch (error) {
    console.error("Error fetching servic-types:", error)

    return {
      notFound: true,
    }
  }
}

export default ServiceType
