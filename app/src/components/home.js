import React from 'react';
import styles from '../styles/home_style.module.css';
import logo from '../images/questify.png';

const Home = () => {
  return (
    <div className={`${styles.background} bg-cover bg-center h-screen flex flex-col`}>
      <header className="flex justify-between items-center p-4">
        <img src={logo} alt="logo" className="h-10 ml-2"/>
        <button onClick={() => (window.location.href = "/workchat")} className={`${styles.button} bg-white text-black px-4 py-2 rounded`}>Questify</button>
      </header>

      <div className={`${styles.container} flex-grow flex items-center`}>
        <div className="text-left">
          <h1 className="font-bold">The Future of workchat...</h1>
          <p className="text-white mb-2">Connect with coworkers easily and efficiently.</p>
          <button onClick={() => (window.location.href = "/login")} className="text-white px-6 py-3 rounded">Sign-up</button>
        </div>
      </div>
      
      <div className='footer'>
            
      </div>
    </div>
  );
};

export default Home;
