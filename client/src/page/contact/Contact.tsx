import styles from './Contact.module.css';
import gmail from '../../assets/icons/gmail-icon.png';
import x from '../../assets/icons/x-icon.png';
import instagram from '../../assets/icons/instagram-icon.png';
import linkedin from '../../assets/icons/linkedin-icon.png';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <>
      <div className="content-container">
        <section className={styles.contact}>
          <div className={styles.contact__socials}>
            <h2>Follow on: </h2>
            <div className={styles['contact__socials-logo-wrapper']}>
              <div className={styles['contact__socials-logo']}>
                <Link to="">
                  <img src={gmail} alt="" />
                </Link>
              </div>
              <div className={styles['contact__socials-logo']}>
                <Link to="https://x.com/abdsa017">
                  <img src={x} alt="" />
                </Link>
              </div>
              <div className={styles['contact__socials-logo']}>
                <Link to="https://www.instagram.com/abd_sa_017/">
                  <img src={instagram} alt="" />
                </Link>
              </div>
              <div className={styles['contact__socials-logo']}>
                <Link to="https://www.linkedin.com/in/rohan-raj-604342213/">
                  <img src={linkedin} alt="" />
                </Link>
              </div>
            </div>
          </div>
          <form></form>
        </section>
      </div>
    </>
  );
};

export default Contact;
