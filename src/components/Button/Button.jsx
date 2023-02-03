import styles from './button.module.css';
import PropTypes from 'prop-types';

const Button = ({ loadMore }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={loadMore} className={styles.Button}>
        Load more
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func,
};
