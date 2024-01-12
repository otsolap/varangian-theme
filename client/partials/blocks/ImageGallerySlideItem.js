import React from "react";
import NextImage from 'partials/util/NextImage';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
// import required modules
import styles from "@/styles/components/imageGallery.module.css";

const ImageGallerySlideItem = ({ images, selectedImage }) => {
  return (
    <>
    {images && (
        <Swiper
            className={styles.imageGallerySwiper}
            slidesPerView={1}
            navigation={true} 
            pagination={{
              type: 'fraction',
            }}
            modules={[Keyboard, Pagination, Navigation]}
            rewind={true}
            initialSlide={selectedImage}
        >
            {images.data.map((image, i) => {
            return (
                <SwiperSlide className={styles.slide} key={i}>
                    <figure className={styles.imageModalContainer}>
                        <NextImage className={styles.image} image={image} />
                    </figure>
                </SwiperSlide>
            );
            })}
        </Swiper>
      )}
    </>
  );
};

export default ImageGallerySlideItem;
