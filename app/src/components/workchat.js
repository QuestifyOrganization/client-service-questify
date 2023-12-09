import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styles from '../styles/workchat_style.module.css';
import perfil from '../images/perfil.jpg';
import toggleMenu from '../js/menu_toogle';
import logo from '../images/questify.png';
import useSocket from '../hooks/useSocket';
import ConditionalSenderNameDisplay from './conditionalSenderNameDisplayComponent';
import ConditionalUserStatusIndicator from './conditionalUserStatusIndicatorComponent'

const Workchat = () => {
  const socket = useSocket();

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [foundChatEntities, setFoundChatEntities] = useState([]); 
  const [currentChatEntity, setCurrentChatEntity] = useState(null);
  const [currentUserIsOnline, setCurrentUserIsOnline] = useState(false);
  const [myUser, setMyUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    socket.on('setMyUser', (user) => {
      setMyUser(user);
      socket.emit('findTalkedChatUsers');
      setIsLoading(false);
    });

    socket.on('message', (message) => {
      const isSenderCurrentEntity = message?.senderId === currentChatEntity?._id;
      const isDirectMessageToMe = message?.recipientContentType === 'ChatUser' && message?.recipientObjectId === myUser?._id;
      const isSenderMyUser = message?.senderId === myUser?._id;
      const isRecipientCurrentEntity = message?.recipientContentType === 'ChatGroup' && currentChatEntity?._id === message?.recipientObjectId;
        
      if (isSenderCurrentEntity && isDirectMessageToMe || isSenderMyUser || isRecipientCurrentEntity) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    
      if (!searchTerm) {
        socket.emit('findTalkedChatUsers');
      }
    });

    socket.on('onlineChatUsersIds', (userSocketMap) => {
      const currentUserIsOnline = userSocketMap[currentChatEntity?._id] ? true: false;
      setCurrentUserIsOnline(currentUserIsOnline);
    });

    socket.on('currentUserIsOnline', (currentUserIsOnline) => {
      setCurrentUserIsOnline(currentUserIsOnline);
    })

    socket.on('findChatEntities', (chatEntities) => {
      setFoundChatEntities(chatEntities); 
    });
  
    socket.on('findTalkedChatUsers', (users) => {
      setFoundChatEntities(users); 
    });

    socket.on('findMessages', (messages) => {
      console.log(messages)
      setMessages(messages); 
    });

    return () => {
      socket.off('message');
      socket.off('findChatEntities'); 
      socket.off('findTalkedChatUsers'); 
      socket.off('findMessages');
      socket.off('setMyUser');
      socket.off('onlineChatUsersIds');
      socket.off('currentUserIsOnline');
    };
  }, [myUser, currentChatEntity]);

  const sendMessage = () => {
    if (messageInput.trim() === '' || !currentChatEntity) return;

    socket.emit('message', {
      messageText: messageInput,
      recipientContentType: currentChatEntity.contentType,
      recipientObjectId: currentChatEntity._id, 
    });
  
    setMessageInput('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    socket.emit('findChatEntities', { name: searchTerm });
  };

  const openChat = (chatEntity) => {
    if (!currentChatEntity || chatEntity._id !== currentChatEntity._id) {
      socket.emit('currentUserIsOnline', chatEntity?._id);
      socket.emit('findMessages', chatEntity);
      setMessages([]); 
      socket.emit('findTalkedChatUsers');
      setSearchTerm('');
    }
    setCurrentChatEntity(chatEntity);
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
          {foundChatEntities.map((user) => (
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

      {currentChatEntity ? (
      <div className="flex-1 flex flex-col">
        <div className={`${styles.contact_super} bg-white p-4 flex`}>
          <span onClick={toggleMenu} className="material-symbols-outlined">
            menu
          </span>
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{currentChatEntity.name}</h2>
            <ConditionalUserStatusIndicator currentUserIsOnline={currentUserIsOnline} chatEntity={currentChatEntity} />
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
                    <ConditionalSenderNameDisplay currentEntity={currentChatEntity} senderName={msg.senderName} />
                    <p>{msg.messageText}</p>
                    <p className="text-xs text-gray-500 opacity-75">{new Date(msg.sendDate).toLocaleString()}</p>
                  </div>
                </li> 
            ))}
            <div ref={messagesEndRef} />
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
      </div> ): (
        <div className={`${styles.contact_super} flex-1 justify-center items-center`} >
            <h2 className="text-xl font-bold">Select a contact</h2>
        </div>
      ) }

    </div>
  );
};

export default Workchat;
