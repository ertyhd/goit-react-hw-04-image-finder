import { useState } from 'react';
import styles from './searchbar.module.css';
// import s from 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setState(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(state);
    setState('');
  };

  return (
    // <form className={styles.Searchbar} onSubmit={handleSubmit}>
    //   <div className={styles.SearchForm}>
    //     <button type="submit" className={styles.SearchFormButton}>
    //       <div className={styles.SearchForButtonLabel}>
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    //           <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
    //         </svg>
    //       </div>
    //     </button>

    //     <input
    //       className={styles.SearchForInput}
    //       value={state}
    //       onChange={handleChange}
    //       name="search"
    //       placeholder="Search images"
    //       required
    //     />
    //   </div>
    // </form>
    <div className={styles.header}>
      <form
        className={styles.searchForm}
        id="search-form"
        onSubmit={handleSubmit}
      >
        <input
          className={styles.searchTxt}
          type="text"
          placeholder="Search images..."
          onChange={handleChange}
          name="search"
          value={state}
          required
        />
        <button className={styles.searchBtn} type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
