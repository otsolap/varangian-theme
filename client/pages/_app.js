import { useState, createContext } from "react"
import ErrorPage from "next/error"
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Layout from "@/components/Layout"
// Fonts
import { poppins, hind_guntur } from "@/utils/fonts";
// Styles
import "@/styles/globals.css"
// Store Strapi Global object in context
import { fetchGlobalData } from "@/utils/index"

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
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily}, sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: ${hind_guntur.style.fontFamily}, serif;
        }
      `}</style>
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