import Socials from '../../components/socials/Socials';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <>
      <div className="content-container">
        <section className={styles.contact}>
          <div className={styles.contact__socials}>
            <h2>Follow on: </h2>
          </div>
          <Socials iconSize="48" />
        </section>
      </div>
    </>
  );
};

export default Contact;
