import Header from "./navigation/Header";
import Footer from "./navigation/Footer";
import MobileFooter from "./navigation/MobileFooter";

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
