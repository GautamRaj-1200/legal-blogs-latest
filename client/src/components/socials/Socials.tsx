import styles from './Socials.module.css';
import gmail from '../../assets/icons/gmail-icon.png';
import x from '../../assets/icons/x-icon.png';
import instagram from '../../assets/icons/instagram-icon.png';
import linkedin from '../../assets/icons/linkedin-icon.png';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../utils/constants';

interface icons {
  iconSize: string;
}
const Socials = ({ iconSize }: icons) => {
  return (
    <div className={styles['socials-logo-wrapper']}>
      <div
        className={styles['socials-logo']}
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      >
        <Link to={socialLinks.email}>
          <img src={gmail} alt="Gmail Icon" />
        </Link>
      </div>
      <div
        className={styles['socials-logo']}
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      >
        <Link to={socialLinks.twitter}>
          <img src={x} alt="X Icon" />
        </Link>
      </div>
      <div
        className={styles['socials-logo']}
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      >
        <Link to={socialLinks.instagram}>
          <img src={instagram} alt="Instagram Icon" />
        </Link>
      </div>
      <div
        className={styles['socials-logo']}
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      >
        <Link to={socialLinks.linkedin}>
          <img src={linkedin} alt="LinkedIn Icon" />
        </Link>
      </div>
    </div>
  );
};

export default Socials;
