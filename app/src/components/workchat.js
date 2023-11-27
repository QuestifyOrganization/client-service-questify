import React from 'react';
import styles from '../styles/workchat_style.module.css';
import perfil from '../images/perfil.jpg'

const Workchat = () => {
    return (
      <div className="flex h-screen bg-gray-100">
        <div className={`${styles.contact} w-1/6 bg-gray-800 text-white p-4`}>
            <h2 className="text-2xl font-bold mb-4">Contacts</h2>
            <ul>
                <li className="flex items-center">
                <img src={perfil} alt="Contato 1" className="w-8 h-8 rounded-full mr-2" />
                Rafael Pinheiro
                </li>
                <li className="flex items-center">
                <img src={perfil} alt="Contato 1" className="w-8 h-8 rounded-full mr-2" />
                Rafael Pinheiro
                </li>
            </ul>
        </div>

        <div className="flex-1 flex flex-col">
          <div className={`${styles.contact_super} bg-white p-4`}>
            <h2 className="text-xl font-bold">Rafael Pinheiro</h2>
            <p>Online</p>
          </div>
  
          <div className={`${styles.messages} flex-1 overflow-y-auto p-4`}>
            {/* mensagens */}
          </div>
  
          <div className={`${styles.input_chat} bg-white p-4`}>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="w-full rounded"
            />
            <button className="text-white px-4 py-2 ml-2 rounded">Enviar</button>
          </div>
        </div>
      </div>
    );
  };

export default Workchat;