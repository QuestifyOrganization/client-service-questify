import { useMemo } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const baseUrl = process.env.REACT_APP_API_CHAT_BASE_URL;
  const authToken = localStorage.getItem('authToken');

  const socket = useMemo(() => {
    return io(baseUrl, {
      auth: {
        authToken: authToken,
      },
    });
  }, [baseUrl, authToken]);

  return socket;
};

export default useSocket;
