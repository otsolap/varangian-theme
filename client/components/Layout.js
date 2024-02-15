import { useContext } from 'react';
import SEO from "@/components/util/SEO";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileFooter from "@/components/navigation/MobileFooter";
import { GlobalContext } from '@/pages/_app.js'; 

export default function Layout({ metadata, children }) {
  const { globalData } = useContext(GlobalContext);
  const { navigation, footer, baseSEO } = globalData;

  return (
    <>
      <SEO baseSEO={baseSEO} metadata={metadata} />
      <Header navigation={navigation} />
        <main className={`container`}>
          {children}
        </main>
      <Footer footer={footer} />1
      <MobileFooter navigation={navigation} />
    </>
  );
}1