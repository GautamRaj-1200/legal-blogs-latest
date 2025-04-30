import styles from './Hero.module.css';
import gavel from '../../assets/hero/gavel_illustration.png';
import bat from '../../assets/hero/cricket.png';
import administration from '../../assets/hero/adminstration.png';
import { useEffect, useState } from 'react';

const Hero = () => {
  const categories = ['law', 'cricket', 'administration'];
  const images = [gavel, bat, administration];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);
  return (
    // <a href="https://www.flaticon.com/free-icons/presidency" title="presidency icons">Presidency icons created by Dewi Sari - Flaticon</a>
    // <a href="https://www.flaticon.com/free-icons/cricket" title="cricket icons">Cricket icons created by Freepik - Flaticon</a>
    <div className="content-container">
      <section className={styles.hero}>
        <div className={styles.hero__left}>
          <h1>Decoding The Game</h1>
          <h2>on the field and in courtrooms</h2>
          <h3>
            Exploring <span>{categories[currentIndex]}</span>
          </h3>
        </div>
        <div className={styles.hero__right}>
          <div className={styles[`hero__right-image--${categories[currentIndex]}`]}>
            <img src={images[currentIndex]} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
