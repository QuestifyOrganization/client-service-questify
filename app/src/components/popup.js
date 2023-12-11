import React from 'react';
import styles from '../styles/popup_style.module.css';

const Popup = ({ message, type, onClose }) => {
  return (
    <div className={`${styles.popup} mb-4 bg-${type === 'success' ? 'green' : 'red'}-100 border-l-4 border-${type === 'success' ? 'green' : 'red'}-500 text-${type === 'success' ? 'green' : 'red'}-700 p-2 rounded-md`}>
      {message}
    </div>
  );
};

export default Popup;
