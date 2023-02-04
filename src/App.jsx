import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import styles from './app.module.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import getImages from 'shared/getImages';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getImages(searchQuery, page);

        const { hits, totalHits } = data;
        setItems(prevItems => [...prevItems, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [searchQuery, page, setLoading, setError, setItems]);

  const hadleSeachSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setItems([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleShowModal = event => {
    const imgAlt = event.target.alt;
    const largeImageURL = event.target.srcset;
    setShowModal(true);
    setImgAlt(imgAlt);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImgAlt('');
    setLargeImageURL('');
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={hadleSeachSubmit} />
      {items.length > 0 && (
        <ImageGallery items={items} handleShowModal={handleShowModal} />
      )}
      {error && Notiflix.Notify.failure(`${error}`)}
      {items.length > 0 && items.length < totalHits && (
        <Button loadMore={loadMore} />
      )}
      {(loading && Notiflix.Loading.pulse()) ||
        (!loading && Notiflix.Loading.remove())}
      {showModal && (
        <Modal
          imgAlt={imgAlt}
          imgLargeSrc={largeImageURL}
          onModalClose={handleCloseModal}
        />
      )}
    </div>
  );
};

/*
class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
    totalHits: 0,
    largeImageURL: '',
    imgAlt: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { searchQuery, page } = this.state;
      const data = await getImages(searchQuery, page);
      const { hits, totalHits } = data;
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits,
      }));
    } 
    catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  hadleSeachSubmit = searchQuery => {
    this.setState({ searchQuery, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleShowModal = event => {
    const imgAlt = event.target.alt;
    const largeImageURL = event.target.srcset;
    this.setState({
      showModal: true,
      imgAlt: imgAlt,
      largeImageURL: largeImageURL,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      imgAlt: '',
      largeImageURL: '',
    });
  };

  render() {
    const {
      items,
      loading,
      error,
      totalHits,
      imgAlt,
      largeImageURL,
      showModal,
    } = this.state;
    const { hadleSeachSubmit, loadMore, handleCloseModal, handleShowModal } =
      this;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={hadleSeachSubmit} />
        {items.length > 0 && (
          <ImageGallery items={items} handleShowModal={handleShowModal} />
        )}
        {error && Notiflix.Notify.failure(`${error}`)}
        {items.length > 0 && items.length < totalHits && (
          <Button loadMore={loadMore} />
        )}
        {(loading && Notiflix.Loading.pulse()) ||
          (!loading && Notiflix.Loading.remove())}
        {showModal && (
          <Modal
            imgAlt={imgAlt}
            imgLargeSrc={largeImageURL}
            onModalClose={handleCloseModal}
          />
        )}
      </div>
    );
  }
}
 */

export default App;
