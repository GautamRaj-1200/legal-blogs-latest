import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
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
            <h1>Brand Logo</h1>
          </div>
          <ul
            ref={navbarRef}
            className={`${styles.navbar__list}  ${navbarVisible ? styles.active : ''}`}
          >
            <li className={styles.navbar__item}>
              <a href="#" className={styles.navbar__link} onClick={handleLinkClick}>
                Home
              </a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#" className={styles.navbar__link} onClick={handleLinkClick}>
                About
              </a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#" className={styles.navbar__link} onClick={handleLinkClick}>
                Contact
              </a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#" className={styles.navbar__link} onClick={handleLinkClick}>
                Blogs
              </a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#" className={styles.navbar__link} onClick={handleLinkClick}>
                {' '}
                SignUp
              </a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#" className={styles.navbar__link} onClick={handleLinkClick}>
                {' '}
                Login
              </a>
            </li>
          </ul>
          <div className={styles['navbar__search-container']}>
            <input placeholder="search" className={styles.search} />
            <button className={styles['navbar__search-btn']}>Search</button>
          </div>
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
