import notFoundImage from '../../assets/404-legal-light.svg';
import styles from './pageNotFound.module.css';
const PageNotFound = () => {
  return (
    <section className={styles.not__found}>
      <h1>Uh! Oh! Page Doesn't exist... </h1>
      <div className={styles['not__found-img-container']}>
        <img src={notFoundImage} alt="" />
      </div>
    </section>
  );
};

export default PageNotFound;
