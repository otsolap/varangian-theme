import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileFooter from "@/components/navigation/MobileFooter";

export default function Layout({ children, global }) {
  const { navigation, footer } = global
  return (
    <>
      <Header navigation={navigation} />
        <main className={`container`}>
          {children}
        </main>
      <Footer footer={footer} />
      <MobileFooter navigation={navigation} />
    </>
  );
}
