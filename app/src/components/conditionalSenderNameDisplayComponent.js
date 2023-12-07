import React from 'react';

const ConditionalSenderNameDisplay = ({ currentEntity, senderName }) => {
    const isGroupChat = currentEntity.contentType === 'ChatGroup';

    return (
        <>
            {isGroupChat && <p className="font-bold">{senderName}</p>}
        </>
    );
};

export default ConditionalSenderNameDisplay;
