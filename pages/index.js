import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import styles from '@/styles/Home.module.css';
import UserTable from '../components/UserTable';
import CompletedUserTable from '../components/CompletedUserTable';
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
        {/* ... */}
      </Head>

      <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : ''}`}>
        <Navbar darkMode={darkMode}/>
        <main className={styles.dashboard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  }}>
         
            
            {isMobileView ? (
              <button className={styles.darkModeButton} onClick={toggleDarkMode} style={{ marginRight: '25px' , marginTop: '2px'}}>
                {darkMode ? (
                  <img src="/light1.png" style={{ width: '50px' }} alt="Sun" />
                ) : (
                  <img src="/dark1.png" style={{ width: '50px' }} alt="Moon" />
                )}
              </button>
            ) : <button className={styles.darkModeButton} onClick={toggleDarkMode}   style={{
              marginRight: '10px',
              marginTop: '2px',
              position: 'relative',
              top: '40px', right:'170px'// Adjust this value as needed
            }}
          >
          
                {darkMode ? (
                  <img src="/light1.png" style={{ width: '50px' }} alt="Sun" />
                ) : (
                  <img src="/dark1.png" style={{ width: '50px' }} alt="Moon" />
                )}
              </button>}
            
          </div>
          <div className={styles.tabs}>
          
       
      
     
       
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
