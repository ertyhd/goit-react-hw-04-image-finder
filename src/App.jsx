import { Component } from 'react';
import Notiflix from 'notiflix';

import styles from './app.module.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import getImages from 'shared/getImages';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

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
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  hadleSeachSubmit = searchQuery => {
    this.setState({ searchQuery, items: [], page: 1 });
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   axios
  //     .get(
  //       'https://pixabay.com/api/?q=cat&page=1&key=31800059-86399197816311d7a5cbd5e2b&q&image_type=photo&orientation=horizontal&per_page=12'
  //     )
  //     .then(({ data }) => {
  //       this.setState({ items: data.hits, loading: false });
  //     })
  //     .catch(error => {
  //       this.setState({ error: error.message });
  //     })
  //     .finally(() => this.setState({ loading: false }));
  // }

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

/* <Searchbar>, <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> и <Modal></Modal> */

export default App;
