import { useContext, useEffect } from "react";
import { GlobalContext } from "@/pages/_app.js";
import { getDataDependencies } from "@/utils/api"
import { useRouter } from "next/router"
import { getPageData, getAllPageSlugs, fetchServicesBannerData } from "@/utils/index"
import Blocks from "@/components/Blocks"
import Banner from "@/components/blocks/Banner"
import FormEmbed from "components/blocks/FormEmbed";
import axios from 'axios'
import ErrorPage from "next/error"
import config from '@/utils/config';

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes
const DynamicPage = ({ metaData, pageData, showServicesBanner, servicesBannerData, showSubscribeForm, subscribeFormData }) => {
  
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
  const subscribeForm = subscribeFormData?.subscribeFormData?.data?.attributes

  // Check if the required data was provided
  if (!router.isFallback && !blocks?.length) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Blocks blocks={blocks} />
      {showServicesBanner && <Banner {...servicesBanner} />}
      {showSubscribeForm && <FormEmbed {...subscribeForm} />}
    </>
  )
}

export async function getStaticPaths() {
  const slugs = await getAllPageSlugs(); // Fetch all slugs

  const paths = slugs.map(slugSegments => ({
    params: { slug: slugSegments }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}


export async function getStaticProps({ params }) {
  const { slug } = params;
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
    const pageData = blocks ? await getDataDependencies(blocks) : {}

    const showSubscribeForm = pageDataObj.attributes.showSubscribeForm
    const subscribeFormData = await fetchSubscribeFormData()
    
    const showServicesBanner = pageDataObj.attributes.showServicesBanner
    const servicesBannerData = await fetchServicesBannerData()

    return {
      props: { 
        metaData, 
        pageData, 
        servicesBannerData, 
        showServicesBanner,
        showSubscribeForm, 
        subscribeFormData
      },
    }
  } catch (error) {
    console.error('Error:', error)
    return { notFound: true }
  }
}


export default DynamicPage
