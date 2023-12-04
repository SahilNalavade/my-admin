import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import styles from '@/styles/Home.module.css';

import DataTable from '../components/DataTable';
const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState({ data: [] });
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

 

  return (
    <>
       <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="interface for admins to see and delete users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : ''}`} style={{marginLeft:'-10px'}}>
        <Navbar darkMode={darkMode}/>
        <main className={styles.dashboard}>
        <div style={{ position: 'relative' }}>
  <button
    className={styles.darkModeButton}
    onClick={toggleDarkMode}
    style={{
      position: 'absolute',
      top: '10px', 
      right: '115px',
    }}
  >
    {darkMode ? (
      <img src="/light1.png" style={{ width: '50px' }} alt="Sun" />
    ) : (
      <img src="/dark1.png" style={{ width: '50px' }} alt="Moon" />
    )}
  </button>
</div>


        

          <div className={styles.tabContent}>
           <DataTable />
          </div>
        </main>
      </div>

    </>
  );
};

export default Home;
