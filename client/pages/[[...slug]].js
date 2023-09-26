import { getDataDependencies } from "@/utils/api"
import { useRouter } from "next/router"
import { getPageData, fetchServicesBannerData } from "@/utils/index"
import Blocks from "@/components/Blocks"
import Banner from "components/blocks/Banner"
import axios from 'axios'
import ErrorPage from "next/error"

const DynamicPages = ({ pageData, showServicesBanner, servicesBannerData }) => {
  const router = useRouter()
  const blocks = pageData.blocks ?? []
  const servicesBanner = servicesBannerData?.serviceBannerData?.data?.attributes?.banner

  // Check if the required data was provided
  if (!router.isFallback && !blocks?.length) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Blocks blocks={blocks} />
      {showServicesBanner && <Banner {...servicesBanner} />}
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query

  try {
    const data = await getPageData(slug)
    const res = await axios.get(data.data)
    const json = res.data

    if (!json.data.length) {
      console.error(`No page data found for slug: ${data.slug}`)
      return { notFound: true }
    }

    const pageDataObj = json.data.find((d) => d.attributes.slug === data.slug)

    // If no data object is found, throw an error
    if (!pageDataObj) {
      console.error(`No page data object found for slug: ${data.slug}`)
      return { notFound: true }
    }

    const blocks = pageDataObj.attributes.blocks
    const showServicesBanner = pageDataObj.attributes.showServicesBanner
    const pageData = blocks ? await getDataDependencies(blocks) : {}
    const servicesBannerData = await fetchServicesBannerData()

    return {
      props: { pageData, servicesBannerData, showServicesBanner },
    }
  } catch (error) {
    console.error('Error:', error)
    return { notFound: true }
  }
}

export default DynamicPages
