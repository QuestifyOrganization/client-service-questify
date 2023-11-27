import React from 'react';
import styles from '../styles/login_style.module.css';

const Login = () => {
  return (
    <div className={`${styles.container}`}>

      <div className={`${styles.logo} flex justify-center mt-8`}>
        {/* Adicione conteúdo do logo aqui */}
      </div>

      <div className={`${styles.login} p-4 rounded`}>
        <h2 className="mb-2 text-left text-white">Login</h2>

        <form action="" method="post">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Senha"
            />
          </div>

          <button type="submit" className={` ${styles.button_login} w-full py-2 px-4 rounded-md`}>
            Entrar
          </button>
        </form>
      </div>

      <div className={`${styles.footer} mt-12`}>
        <div className={`${styles.register} flex justify-center`}>
          <p className='text-white'>
          Don't have a registration?<a href="/register" className="text-blue-500"> Register</a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
