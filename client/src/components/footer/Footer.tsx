import { navLinksText, title } from '../../utils/constants';
import Socials from '../socials/Socials';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <section className={styles.footer}>
        <div className="content-container">
          <div className={styles.footer_content}>
            <div className={styles.footer_links_container}>
              <li className={styles.footer_item}>
                <Link to="/privacy">{navLinksText.PRIVACY}</Link>
              </li>
              <li className={styles.footer_item}>
                <Link to="/terms">{navLinksText.TERMS}</Link>
              </li>
            </div>
            <Socials iconSize="24" />
            <div className={styles.footer_copy}>
              <span>&copy;</span>
              <span>{title.header}</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
