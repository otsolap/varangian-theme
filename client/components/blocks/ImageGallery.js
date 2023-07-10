import useToggle from "@/hooks/useToggle"
import { useLocalStorage }from "@/hooks/useStorage"
import NextImage from 'partials/util/NextImage';
import Modal from "partials/blocks/Modal";
import ImageGallerySlideItem from "partials/blocks/ImageGallerySlideItem";
import styles from '@/styles/components/imageGallery.module.scss'

const ImageGallery = ({ images, title }) => {
  const [show, toggleModal] = useToggle(false);
  const [selectedImage, setSelectedImage, removeSelectedImage] = useLocalStorage('image', undefined);

  const openModal = (image) => {
    setSelectedImage(image);
    toggleModal(true);
  };

  const closeModal = () => {
    removeSelectedImage();
    toggleModal(false);
  };

  return (
    <section className={styles.imageGallery}>
        <div className={styles.wrapper}>
            {images.data && images.data.map((image, i) => (
            <figure className={styles.imageContainer} id={i} key={i} onClick={() => openModal(i)}>
                <NextImage className={styles.image} image={image} />
            </figure>
            ))}
        </div>
      <figcaption className={styles.title}>{title}</figcaption>
      {show &&  (
        <Modal show={show} handleClose={() => closeModal()}>
            <ImageGallerySlideItem images={images} selectedImage={selectedImage} />
        </Modal>
      )}
    </section>
  );
};

export default ImageGallery;
