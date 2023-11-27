import React from 'react';
import styles from '../styles/register_style.module.css';

const Register = () => {
  return (
    <div className={`${styles.container}`}>

      <div className={`${styles.logo} flex justify-center mt-8`}>
        {/* Adicione conteúdo do logo aqui */}
      </div>

      <div className={`${styles.login} p-4 rounded`}>
        <h2 className="mb-2 text-left text-white">Register</h2>

        <form action="" method="post">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="company"
              id="company"
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Enter your company"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={` ${styles.button_login} w-full py-2 px-4 rounded-md`}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
