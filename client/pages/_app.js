import { useState, createContext } from "react"
import ErrorPage from "next/error"
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import Layout from "@/components/Layout"
// Styles
import "@/styles/globals.scss"
// Store Strapi Global object in context
import { fetchGlobalData } from "utils/index"

export const GlobalContext = createContext({
  globalData: {}, 
  blogNavigation: null,
  setBlogNavigation: () => {}
})

// Analytics Tag Manager
import AnalyticsTagManager from "@/components/util/AnalyticsTagManager"

function MyApp({ Component, pageProps }) {
  const [blogNavigation, setBlogNavigation] = useState(null);
  const [metaData, setMetaData] = useState(null);
  
  // extracting necessary data
  const { global } = pageProps
  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const globalContextValue = {
    metaData,
    setMetaData,
    globalData: global,
    blogNavigation,
    setBlogNavigation
  };

  return (
    <>
      <GlobalContext.Provider value={globalContextValue}>
        <AnalyticsTagManager />
        <Layout global={global} metadata={metaData}>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const globalRes = await fetchGlobalData(appContext)
  
  return {
    pageProps: { global: globalRes},
  }
}

export default MyApp