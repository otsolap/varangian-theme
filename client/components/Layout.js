import SEO from "@/components/util/SEO";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileFooter from "@/components/navigation/MobileFooter";

export default function Layout({ children, global }) {
  const { seo, navigation, footer, } = global
  return (
    <>
    <SEO metadata={seo} />
      <Header navigation={navigation} />
        <main className={`container`}>
          {children}
        </main>
      <Footer footer={footer} />
      <MobileFooter navigation={navigation} />
    </>
  );
}
