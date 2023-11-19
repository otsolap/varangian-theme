import { useState, createContext } from "react"
import ErrorPage from "next/error"
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import Layout from "@/components/Layout"
import { fetchGlobalData } from "utils/index"
import "@/styles/globals.scss"
// Store Strapi Global object in context
export const GlobalContext = createContext({
  globalData: {}, 
  blogNavigation: null,
  setBlogNavigation: () => {}
})

function MyApp({ Component, pageProps }) {
  console.log(pageProps)
  const [blogNavigation, setBlogNavigation] = useState(null);
  // extracting necessary data
  const { global } = pageProps
  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const globalContextValue = {
    globalData: global,
    blogNavigation,
    setBlogNavigation
  };

  return (
    <>
      <GlobalContext.Provider value={globalContextValue}>
        <Layout global={global}>
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