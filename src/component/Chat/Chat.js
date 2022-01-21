import React, { useEffect, useState } from 'react';
import { user } from "../Join/Join";
import sendLogo from "../../Images/send.png";
import closeIcon from "../../Images/closeIcon.png";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";


const ENDPOINT = "http://localhost:4500/";
let socket;

const Chat = () => {

    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById("chatInput").value;
        socket.emit("message", { message, id })
        document.getElementById("chatInput").value = "";
    }

    useEffect(() => {

        socket = socketIO(ENDPOINT, { transports: ["websocket"] });

        socket.on("connect", () => {
            alert("connected")
            setId(socket.id);
        })

        socket.emit("joined", { user })

        socket.on("welcome", (data) => {
            setMessages([...messages, data]);
            console.log(`${data.user}: ${data.message}`);
        })

        socket.on("userJoined", (data) => {
            setMessages([...messages, data]);
            console.log(`${data.user}: ${data.message}`);
        })

        socket.on("leave", (data) => {
            setMessages([...messages, data]);
            console.log(`${data.user}: ${data.message}`)
        })

        return () => {
            socket.emit("disconnect")
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessages([...messages, data]);
            console.log(`${data.user}: ${data.message} with id ${data.id}`)
        })

        return () => {
            socket.off();
        };
    }, [messages]);



    return (
        <div className='chatPage'>
            <div className="chatContainer">
                <div className="header">
                    <h2>Go Chat</h2>
                    <a href="/"><img src={closeIcon} alt="close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => {
                        return <Message user={item.id === id ? "" : item.user} message={item.message} classs={item.id === id ? "right" : "left"} />
                    })}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : ""} type="text" id="chatInput" placeholder='Type a message' />
                    <button onClick={send} className='sendBtn'><img src={sendLogo} alt="sendImage" /></button>
                </div>
            </div>
        </div>
    )
};

export default Chat;
