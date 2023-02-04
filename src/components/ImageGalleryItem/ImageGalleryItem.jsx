import styles from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  handleShowModal,
}) {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        onClick={handleShowModal}
        src={webformatURL}
        srcSet={largeImageURL}
        alt={tags}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleShowModal: PropTypes.func,
};
