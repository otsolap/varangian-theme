import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import useToggle from "@/hooks/useToggle";
import Offcanvas from "@/components/navigation/Offcanvas";
import MobileNavLinks from "@/partials/navigation/MobileNavLinks";
import MenuButton from "@/partials/navigation/MenuButton";
import styles from "@/styles/components/mobileFooter.module.scss";

const MobileFooter = ({ navigation }) => {
    const [showModal, setShowModal] = useToggle(false);
    const [footerOpacity, setFooterOpacity] = useState(1);
    const router = useRouter();
    const lastScrollY = useRef(0);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current) {
            setFooterOpacity(0.5);
        } else {
            setFooterOpacity(1);
        }

        lastScrollY.current = currentScrollY;
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const global = navigation && navigation.data ? navigation.data.attributes : {};
    const PRIMARY_PAGES = 4;

    return (
        <footer className={`mobile-only ${styles.mobile}`} style={{ opacity: footerOpacity }}>
            <div className={styles.menuWrapper}>
                <MobileNavLinks blocks={global.blocks.slice(0, PRIMARY_PAGES)} currentPath={router.asPath} />
                <MenuButton isMenuOpen={showModal} toggleMenu={setShowModal} />
                <Offcanvas
                    navigation={navigation}
                    show={showModal}
                    closeModal={() => setShowModal(false)}
                />
            </div>
        </footer>
    );
};

export default MobileFooter;