import Hero from "@/components/blocks/Hero"
import ArchiveSection from "@/components/articles/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import axios from "axios"
import config from '@/utils/config'

const ServiceArchive = ({ hero, items }) => {
  return  (
    <>
      <Hero {...hero} />
    </>
  )
}

export async function getStaticProps() {
  try {
    const [archivePageResponse, servicesResponse] = await Promise.all([
      axios.get(getStrapiURL(`/${config.services.API_ARCHIVE_PAGE_QUERY}`)),
      axios.get(getStrapiURL(`/${config.services.API_SERVICES_QUERY}`)),
    ])

    return {
      props: {
        hero: archivePageResponse.data.data.attributes.hero ?? {},
        items: servicesResponse.data.data ?? {},
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
