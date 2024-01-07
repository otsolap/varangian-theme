import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/services/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import axios from "axios"
import config from '@/utils/config'

const ServiceArchive = ({ hero, items, service_types }) => {
  return  (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} service_types={service_types} />
    </>
  )
}

export async function getStaticProps() {
  try {
    const [archivePageResponse, servicesResponse, serviceTypesResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.services.API_ARCHIVE_PAGE_QUERY}`)),
      axios.get(getStrapiURL(`/${config.services.API_SERVICES_QUERY}`)),
      axios.get(getStrapiURL(`/${config.services.API_SERVICE_TYPES_PATH_QUERY}`))
    ])

    return {
      props: {
        hero: archivePageResponse.data.data.attributes.hero ?? {},
        items: servicesResponse.data.data ?? {},
        service_types: serviceTypesResponse.data.data ?? {},
      },
    }
  } catch (error) {
    console.error("Error fetching service data:", error)

    return {
      notFound: true,
    }
  }
}

export default ServiceArchive
