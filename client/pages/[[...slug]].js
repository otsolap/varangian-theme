import { useContext, useEffect } from "react";
import { GlobalContext } from "@/pages/_app.js";
import { getDataDependencies } from "@/utils/api"
import { useRouter } from "next/router"
import { getPageData, fetchServicesBannerData } from "@/utils/index"
import Blocks from "@/components/Blocks"
import Banner from "@/components/blocks/Banner"
import axios from 'axios'
import ErrorPage from "next/error"
import config from '@/utils/config';

const DynamicPages = ({ metaData, pageData, showServicesBanner, servicesBannerData }) => {
  
  const { setMetaData } = useContext(GlobalContext);

  useEffect(() => {
    setMetaData({
        metaData,
    });
  
    return () => setMetaData(null);
  }, [metaData, setMetaData]);

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
  const { nonPageSlugs } = config;

  // Check if the slug is a non-page slug and return notFound if it is
  if (nonPageSlugs.includes(slug?.[0])) {
      return { notFound: true };
  }

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

    const metaData = pageDataObj.attributes?.seo ?? {}
    const showServicesBanner = pageDataObj.attributes.showServicesBanner
    const pageData = blocks ? await getDataDependencies(blocks) : {}
    const servicesBannerData = await fetchServicesBannerData()

    return {
      props: { 
        metaData, 
        pageData, 
        servicesBannerData, 
        showServicesBanner 
      },
    }
  } catch (error) {
    console.error('Error:', error)
    return { notFound: true }
  }
}

export default DynamicPages
