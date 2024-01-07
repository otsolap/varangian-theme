import Hero from "@/components/blocks/Hero"
import ArchiveSection from "@/components/services/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import axios from "axios"
import config from '@/utils/config'

const ServiceArchive = ({ hero, items, categories }) => {
  return  (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} categories={categories} />
    </>
  )
}

export async function getStaticProps() {
  try {
    const [archivePageResponse, servicesResponse, serviceTypesResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.services.API_ARCHIVE_PAGE_QUERY}`)),
      axios.get(getStrapiURL(`/${config.services.API_SERVICES_QUERY}`)),
      axios.get(getStrapiURL('/api/service-types')),
    ])

    return {
      props: {
        hero: archivePageResponse.data.data.attributes.hero ?? {},
        items: servicesResponse.data.data ?? {},
        categories: serviceTypesResponse.data.data ?? {},
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
