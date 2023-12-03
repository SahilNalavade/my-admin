

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const NotFound = () => {
  return (
    <div style={{ textAlign: 'center',background:'#fff' ,height:'100vh',paddingTop: '5%',color:'#000'}}>
      <img
        src="/download.png"  
        alt="Error Image"
        style={{ maxWidth: '30%', height: 'auto', marginBottom:'5%' }}
      />
      <h1>404 - Page Not Found</h1>
      <p>Looks like you&apos;ve stumbled upon the land of mischievous 404 errors.</p>
      
   
      <Link href="/">
        <div style={{ textDecoration: 'none', padding: '10px 20px', background: '#4643EE', color: '#fff', borderRadius: '5px', display: 'inline-block', marginTop:'15%' }}>
          Go Back Home
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
