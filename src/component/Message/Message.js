import React from 'react';
import "./Message.css";
// import audioTune from "";

const Message = ({ user, message, classs }) => {

    const audio = new Audio('/popup.mp3');

    if (classs === 'left') {
        // console.log(message);
        audio.play();
    }


    if (user) {
        return (
            <div className={`messageBox ${classs}`}>
                {`${user}: ${message}`}
            </div>
        )
    }

    else {
        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }

};

export default Message;