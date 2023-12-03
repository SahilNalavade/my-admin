import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Navbar.module.css';

const Navbar = ({ darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles['dark-mode'] : ''}`}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>

        
      </div>

      <ul className={`${styles.navList} ${isMenuOpen ? styles.show : ''}`}>
        <li>
        <img src={darkMode ? '/download.png' : '/download.png'} alt="Logo" className={styles.logoImage} />

        </li>
        <li className={router.pathname === '/overview' ? styles.selected : ''}>
          <Link href="/overview">Overview</Link>
        </li>
        <li className={router.pathname === '/onboarding' ? styles.selected : ''}>
          <Link href="/onboarding">Onboarding</Link>
        </li>
        <li className={router.pathname === '/' ? styles.selected : ''}>
          <Link href="/">Monitoring</Link>
        </li>
        <li className={router.pathname === '/flagging' ? styles.selected : ''}>
          <Link href="/flagging">Flagging</Link>
        </li>
        <li className={router.pathname === '/src' ? styles.selected : ''}>
          <Link href="/src">Source of Income</Link>
        </li>
        <li className={router.pathname === '/uar' ? styles.selected : ''}>
          <Link href="/uar">UAR</Link>
        </li>

        <div className={styles.userContainer}>
        <li className={styles.userSection}>
          <div className={styles.userImageWrapper}>
            <img src='/elon.jpg' alt="User" className={styles.userImage} />
          </div>
          <div>
            <div className={styles.userName}>Elon Musk</div>
            <div className={styles.additionalName}>elon@twitter.com</div>
          </div>
        </li>
      </div>
    
      </ul>
    </nav>
  );
};

export default Navbar;
