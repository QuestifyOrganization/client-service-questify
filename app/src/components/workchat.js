import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/workchat_style.module.css';
import perfil from '../images/perfil.jpg';
import toggleMenu from '../js/menu_toogle';
import io, { connect } from 'socket.io-client';
import logo from '../images/questify.png';
import useSocket from '../hooks/useSocket'; // Substitua pelo caminho correto


const Workchat = () => {
  const socket = useSocket();

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [foundUsers, setFoundUsers] = useState([]); 
  const [foundMessages, setFoundMessages] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserIsOnline, setCurrentUserIsOnline] = useState(false);
  const [myUser, setMyUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on('setMyUser', (user) => {
      setMyUser(user);
      socket.emit('findTalkedChatUsers');
      setIsLoading(false);
    });

    socket.on('message', (data) => {

      if (data?.senderId == currentUser?._id || data?.senderId == myUser?._id) {
        setMessages((prevMessages) => [...prevMessages, data]);
      } else if ( !myUser && data?.senderId != currentUser?._id ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      } 

      if (!searchTerm){
        socket.emit('findTalkedChatUsers')
      }
    });

    socket.on('onlineChatUsersIds', (userSocketMap) => {
      const currentUserIsOnline = userSocketMap[currentUser?._id] ? true: false;
      setCurrentUserIsOnline(currentUserIsOnline);
    });

    socket.on('currentUserIsOnline', (currentUserIsOnline) => {
      setCurrentUserIsOnline(currentUserIsOnline);
    })

    socket.on('findChatUsers', (users) => {
      setFoundUsers(users); 
    });
  
    socket.on('findTalkedChatUsers', (users) => {
      setFoundUsers(users); 
    });

    socket.on('findMessages', (messages) => {
      setFoundMessages(messages); 
      setMessages(messages); 
    });

    return () => {
      socket.off('message');
      socket.off('findChatUsers'); 
      socket.off('findTalkedChatUsers'); 
      socket.off('findMessages');
      socket.off('setMyUser');
      socket.off('onlineChatUsersIds');
      socket.off('currentUserIsOnline');
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
    socket.emit('findChatUsers', { name: searchTerm });
  };

  const openChat = (user) => {
    socket.emit('currentUserIsOnline', user?._id);
    if (!currentUser || user._id !== currentUser._id) {
      socket.emit('findMessages', { recipientContentType:'ChatUser', recipientObjectId: user._id })
      setMessages([]); 
      socket.emit('findTalkedChatUsers');
      setSearchTerm('');
    }
    setCurrentUser(user);
  };
  
  const LoadingScreen = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="text-white">Loading...</div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100"> 
      {isLoading && <LoadingScreen />}
      <div className={`${styles.contact} w-1/6 bg-gray-800 text-white p-4 flex flex-col`}>
        <div className="flex justify-center items-center mb-4">
          <img onClick={() => (window.location.href = "/")} src={logo} alt="logo" style={{ width: '80%', height: '80%', cursor: 'pointer'}} className="h-10 ml-2 p-2 mt-4"/>
        </div>
        <hr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.082)' }} className="mb-4" />
        <ul className="">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 mb-4 rounded text-white focus:outline-none"
          />
          {foundUsers.map((user) => (
            <li key={user._id} className="flex items-center cursor-pointer" onClick={() => openChat(user)}>
              <img src={perfil} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
              {user.name}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <hr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.082)' }} className="mb-4" />
          <div className='flex items-center justify-between'>
            <div></div>
            <div className="mb-2">
              {myUser ? myUser.name : "Loading..."}
            </div>
            <span onClick={() => (window.location.href = "/logout")} className="material-symbols-outlined cursor-pointer">
              logout
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`${styles.contact_super} bg-white p-4 flex`}>
          <span onClick={toggleMenu} className="material-symbols-outlined">
            menu
          </span>
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{currentUser ? currentUser.name : "Select a contact"}</h2>
            <span className={`h-3 w-3 rounded-full inline-block mr-2 ${currentUserIsOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>
        </div>
        <div onClick={toggleMenu} className={`${styles.messages} flex-1 overflow-y-auto p-4`}>
          <ul>
            {messages.map((msg, index) => (
              msg.senderId === myUser._id ?
                <li key={index} className={`${styles.message_chat} flex justify-end items-start mb-2`}>
                  <div className="text-white rounded-md">
                    <p className="flex justify-end" >{msg.messageText}</p>
                    <p className="text-xs text-gray-500 opacity-75">{new Date(msg.sendDate).toLocaleString()}</p>
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
                    <p>{msg.messageText}</p>
                    <p className="text-xs text-gray-500 opacity-75">{new Date(msg.sendDate).toLocaleString()}</p>
                  </div>
                </li> 
            ))}
          </ul>
        </div>
          <div className={`${styles.input_chat} bg-white p-4`}>
            <input
              type="text"
              placeholder="message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              className="w-full rounded focus:outline-none"
            />
            <button onClick={sendMessage} className="text-white px-4 py-2 ml-2 rounded">
              Submit
            </button>
          </div>
      </div>
    </div>
  );
};

export default Workchat;
