import useToggle from "@/hooks/useToggleState"
import useLocalStorage from "@/hooks/useLocalStorage"
import styles from '@/styles/components/imageGallery.module.scss'
import NextImage from 'partials/util/NextImage';

const ImageGallery = ({ images, title }) => {
  const [isOpen, toggleModal] = useToggle(false);
  const [selectedImage, setSelectedImage] = useLocalStorage('image',false);

  const openModal = (image) => {
    setSelectedImage(image);
    toggleModal();
  };

  const closeModal = () => {
    setSelectedImage(null);
    toggleModal();
  };

  return (
    <figure className={styles.imageGallery}>
        <div className={styles.wrapper}>
            {images.data && images.data.map((image, i) => (
            <figure className={styles.imageContainer} key={i} onClick={() => openModal(image)}>
                <NextImage className={styles.image} image={image} />
            </figure>
            ))}
        </div>
      <figcaption className={styles.title}>{title}</figcaption>

      {isOpen && selectedImage && (
        <div className="modal">
          <div className="modal-content">
                <NextImage image={selectedImage} />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </figure>
  );
};

export default ImageGallery;
