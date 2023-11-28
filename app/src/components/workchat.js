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
  const [searchTerm, setSearchTerm] = useState('');
  const [foundUsers, setFoundUsers] = useState([]); 
  const [foundMessages, setFoundMessages] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {

    socket.on('setMyUser', (user) => {
      setMyUser(user);
    });

    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('findChatUsers', (users) => {
      setFoundUsers(users); 
    });

    socket.on('findMessages', (messages) => {
      setFoundMessages(messages); 
      console.log(messages);
      setMessages(messages); 
    });

    return () => {
      socket.off('message');
      socket.off('findChatUsers'); 
      socket.off('findMessages');
      socket.off('setMyUser');
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() === '' || !currentUser) return;
  
    socket.emit('message', {
      messageText: messageInput,
      recipientContentType: 'ChatUser',
      recipientObjectId: currentUser._id, 
    });
  
    setMessageInput('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      socket.emit('findChatUsers', { name: searchTerm });
    }
  };

  const openChat = (user) => {
    if (!currentUser || user._id !== currentUser._id) {
      socket.emit('findMessages', { recipientContentType:'ChatUser', recipientObjectId: user._id })
      setMessages([]); 
    }
    setCurrentUser(user);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${styles.contact} w-1/6 bg-gray-800 text-white p-4`}>
        <h2 className="text-2xl font-bold mb-4">Contacts</h2>
        <ul>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            className="w-full p-2 mb-4 rounded text-white focus:outline-none"
          />
          {foundUsers.map((user) => (
            <li key={user._id} className="flex items-center cursor-pointer" onClick={() => openChat(user)}>
              <img src={perfil} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
      <div className={`${styles.contact_super} bg-white p-4 flex`}>
        <span onClick={toggleMenu} className="material-symbols-outlined">
          menu
        </span>
        <div>
          <h2 className="text-xl font-bold">{currentUser ? currentUser.name : "Selecione um contato"}</h2>
          <p>{currentUser && currentUser.isOnline ? "Online" : "Offline"}</p>
        </div>
        <span onClick={() => (window.location.href = "/")} className="material-symbols-outlined">
          close
        </span>
      </div>

      <div onClick={toggleMenu} className={`${styles.messages} flex-1 overflow-y-auto p-4`}>
        <ul>
          {messages.map((msg, index) => (
            msg.senderId === myUser._id ?
              <li key={index} className={`${styles.message_chat} flex justify-end items-start mb-2`}>
                <div className="text-white rounded-md">
                  <p className="font-bold">Me</p>
                  <p>{msg.messageText}</p>
                </div>
                <img
                  src={perfil}
                  alt="Imagem do remetente"
                  className="w-8 h-8 rounded-full ml-2"
                />
              </li> :
              <li key={index} className={`${styles.message_chat} flex items-start mb-2`}>
                <img
                  src={perfil}
                  alt="Imagem do remetente"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-white rounded-md">
                  <p className="font-bold">{msg.senderName}</p>
                  <p>{msg.messageText}</p>
                </div>
              </li> 
          ))}
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
