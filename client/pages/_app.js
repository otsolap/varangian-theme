import App from "next/app"
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
  setBlogNavigation: () => {},
  servicesNavigation: null,
  setServicesNavigation: () => {}
})

// Analytics Tag Manager
import AnalyticsTagManager from "@/components/util/AnalyticsTagManager"

function MyApp({ Component, pageProps }) {
  const [blogNavigation, setBlogNavigation] = useState(null);
  const [servicesNavigation, setServicesNavigation] = useState(null);
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
    setBlogNavigation,
    servicesNavigation,
    setServicesNavigation
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
        <Layout metadata={metaData}>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </>
  )
}
// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const globalRes = await fetchGlobalData(appContext)
  
  return {
    ...appProps,
    pageProps: { global: globalRes},
  }
}

export default MyApp