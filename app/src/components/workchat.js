import React, { useState, useEffect } from 'react';
import styles from '../styles/workchat_style.module.css';
import perfil from '../images/perfil.jpg';
import toggleMenu from '../js/menu_toogle';
import io from 'socket.io-client';

const socket = io('http://localhost:3004', {
  auth: {
    authToken: localStorage.getItem('authToken'),
  },
});

const Workchat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data)
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    socket.emit('message', {
      messageText: messageInput,
      recipientContentType: 'ChatUser',
      recipientObjectId: '65647a913851c16d498ca071',
    });

    setMessageInput('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${styles.contact} w-1/6 bg-gray-800 text-white p-4`}>
        <h2 className="text-2xl font-bold mb-4">Contacts</h2>
        <ul>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-4 rounded text-white focus:outline-none"
          />
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
        <div className={`${styles.contact_super} bg-white p-4 flex`}>
          <span onClick={toggleMenu} className="material-symbols-outlined">
            menu
          </span>
          <div>
            <h2 className="text-xl font-bold">Rafael Pinheiro</h2>
            <p>Online</p>
          </div>
          <span onClick={() => (window.location.href = "/")} className="material-symbols-outlined">
            close
          </span>
        </div>

        <div onClick={toggleMenu} className={`${styles.messages} flex-1 overflow-y-auto p-4`}>
          <ul>
          <li className={`${styles.message_chat} flex items-start mb-2`}>
            <img
              src={perfil}
              alt="Imagem do remetente"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="text-white rounded-md">
              <p className="font-bold">Rafael</p>
              <p>dfusniudfyusdbfuybsdfjfdiosjfiodsjfiosjdfiojs</p>
            </div>
          </li>
            {/* {messages.map((message, index) => (
              <li key={index}>{`${message.senderName}: ${message.messageText}`}</li>
            ))} */}
          </ul>
        </div>

        <div className={`${styles.input_chat} bg-white p-4`}>
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="w-full rounded focus:outline-none"
          />
          <button onClick={sendMessage} className="text-white px-4 py-2 ml-2 rounded">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workchat;
