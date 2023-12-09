import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/questify.png';
import styles from '../styles/header_logo_style.module.css';

const Logo = () => {
  return (
    <img onClick={() => (window.location.href = "/")} src={logo} alt="logo" style={{cursor: 'pointer'}} className={`${styles.logo} flex justify-center`}/>
  );
};

export default Logo;
