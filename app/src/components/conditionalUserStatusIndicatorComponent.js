import React from 'react';

const ConditionalUserStatusIndicator = ({ currentUserIsOnline, chatEntity }) => {
  const shouldDisplayIndicator = chatEntity.contentType === 'ChatUser';

  return (
    <>
      {shouldDisplayIndicator && (
        <span className={`h-3 w-3 rounded-full inline-block mr-2 ${currentUserIsOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
      )}
    </>
  );
};

export default ConditionalUserStatusIndicator;
