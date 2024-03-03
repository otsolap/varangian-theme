import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Offcanvas from "@/components/navigation/Offcanvas";
import MobileNavLinks from "@/partials/navigation/MobileNavLinks";
import MenuButton from "@/partials/navigation/MenuButton";
import styles from "@/styles/components/mobileFooter.module.css";

const MobileFooter = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [footerOpacity, setFooterOpacity] = useState(1);
    const router = useRouter();
    const lastScrollY = useRef(0);

    const handleScroll = useCallback(() => {
        if (showModal) {
            setFooterOpacity(1);
            return;
        }

        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
            setFooterOpacity(0.5);
        } else {
            setFooterOpacity(1);
        }
        lastScrollY.current = currentScrollY;
    }, [showModal]);

    useEffect(() => {
        handleScroll(); // Initial scroll position
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, showModal]); 

    const global = navigation && navigation.data ? navigation.data.attributes : {};
    const PRIMARY_PAGES = 3;

    return (
        <footer className={`mobile-only ${styles.mobile}`} style={{ opacity: footerOpacity }}>
            <div className={styles.menuWrapper}>
                <MobileNavLinks blocks={global.blocks.slice(0, PRIMARY_PAGES)} currentPath={router.asPath} closeModal={() => setShowModal(false)} />
                {global.blocks.length > PRIMARY_PAGES ? (
                    <>
                     <MenuButton isMenuOpen={showModal} toggleMenu={() => setShowModal(value => !value)} />
                    <Offcanvas
                    navigation={navigation}
                    show={showModal}
                    closeModal={() => setShowModal(false)}
                    />
                    </>
                ) : null}
            </div>
        </footer>
    );
};

export default MobileFooter;