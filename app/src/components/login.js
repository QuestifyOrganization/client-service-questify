import React from 'react';
import styles from '../styles/login_style.module.css';

const Login = () => {
  return (
    <div className={`${styles.container}`}>

      <div className={`${styles.logo} flex justify-center mt-8`}>
        {/* Adicione conteúdo do logo aqui */}
      </div>

      <div className={`${styles.login} p-4 rounded`}>
        <h2 className="mb-2 text-left">Login</h2>

        <form action="" method="post">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Email"
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

        <div className={`${styles.reset_password} mt-2 flex items-center`}>
          <a href="#" className="text-blue-500">
            Esqueceu sua senha?
          </a>
        </div>
      </div>

      <div className={`${styles.footer} mt-12`}>
        <div className={`${styles.register} flex justify-center`}>
          <p>
            Não tem cadastro? <a href="#" className="text-blue-500">Registre-se</a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
