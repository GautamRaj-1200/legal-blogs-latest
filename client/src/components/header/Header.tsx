import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import legalBlogsLogo from '../../assets/legal-blogs-by-rohan-logo.svg';
import LinkButton from '../common/linkButton/LinkButton';
const Header = () => {
  const [navbarVisible, setNavbarVisible] = useState<boolean>(false);
  const navbarRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };
  console.log(navbarVisible);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node)
    ) {
      setNavbarVisible(false);
    }
  };
  const handleLinkClick = () => {
    setNavbarVisible(false);
  };

  useEffect(() => {
    if (navbarVisible) document.addEventListener('mousedown', handleClickOutside);
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarVisible]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.navbar__logo}>
            <Link to="/">
              <img src={legalBlogsLogo} alt="Logo of the application" />
            </Link>
          </div>
          <ul
            ref={navbarRef}
            className={`${styles.navbar__list}  ${navbarVisible ? styles.active : ''}`}
          >
            <li className={styles.navbar__item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${isActive ? styles.active : ''}`
                }
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${isActive ? styles.active : ''}`
                }
                onClick={handleLinkClick}
              >
                About
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${isActive ? styles.active : ''}`
                }
                onClick={handleLinkClick}
              >
                Contact
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${isActive ? styles.active : ''}`
                }
                onClick={handleLinkClick}
              >
                Blogs
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <LinkButton to="/register" variant="outlined" onClick={handleLinkClick}>
                SignUp
              </LinkButton>
            </li>
            <li className={styles.navbar__item}>
              <LinkButton to="/login" variant="primary" onClick={handleLinkClick}>
                Login
              </LinkButton>
            </li>
          </ul>
          <div onClick={toggleNavbar} className={styles.navbar__hamburger} ref={hamburgerRef}>
            <div
              className={`${styles['navbar__hamburger-bar']} ${styles['navbar__hamburger-bar1']} ${
                navbarVisible ? styles.active : ''
              }`}
            ></div>
            <div
              className={`${styles['navbar__hamburger-bar']} ${styles['navbar__hamburger-bar2']} ${
                navbarVisible ? styles.active : ''
              }`}
            ></div>
            <div
              className={`${styles['navbar__hamburger-bar']} ${styles['navbar__hamburger-bar3']} ${
                navbarVisible ? styles.active : ''
              }`}
            ></div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
