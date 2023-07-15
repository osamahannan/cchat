import React, { useEffect, useState } from 'react';
import { user } from "../Join/Join";
import sendLogo from "../../Images/send.png";
import logo from "../../Images/gochat2.png";
import closeIcon from "../../Images/closeIcon.png";
// import audioTune from "../../Images/popup.mp3";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";


const ENDPOINT = "https://gochat-backend.onrender.com";
// const ENDPOINT = "http://localhost:4500" || "https://gochat-backend.vercel.app";
// const ENDPOINT = "http://13c40e998bb1:3000";
let socket;

const Chat = () => {

    // const audioTune = new Audio('./popup.mp3');

    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    // var audio = new Audio('Images/popup.mp3');

    const send = () => {
        const message = document.getElementById("chatInput").value;
        socket.emit("message", { message, id })
        document.getElementById("chatInput").value = "";
    }

    useEffect(() => {
        // audio.play();

        socket = socketIO(ENDPOINT, { transports: ["websocket"] });

        socket.on("connect", () => {
            // alert("connected")
            setId(socket.id);
        })

        socket.emit("joined", { user })

        socket.on("welcome", (data) => {
            setMessages([...messages, data]);
            // console.log(`${data.user}: ${data.message}`);
            // audio.play();
        })

        return () => {
            socket.emit("disconnect")
            socket.off();
        };
    }, []);

    useEffect(() => {

        socket.on("leave", (data) => {
            setMessages([...messages, data]);
            // console.log(`${data.user}: ${data.message}`);
        })

        socket.on("userJoined", (data) => {
            setMessages([...messages, data]);
            // console.log(`${data.user}: ${data.message}`);
        })

        socket.on("sendMessage", (data) => {
            setMessages([...messages, data]);
            // console.log(`${data.user}: ${data.message}`)
        })

        return () => {
            socket.off();
        };
    }, [messages]);


    return (
        <div className='chatPage'>
            <div className="chatContainer">
                <div className="header">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <h2>Go Chat</h2>
                    </div>
                    <a href="/"><img src={closeIcon} alt="close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item) => {
                        return <Message key = {id} user={item.id === id ? "" : item.user} message={item.message} classs={item.id === id ? "right" : "left"} />
                    })}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : ""} type="text" id="chatInput" placeholder='Type a message' autoComplete='off' />
                    <button onClick={send} className='sendBtn'><img src={sendLogo} alt="sendImage" /></button>
                </div>
            </div>
        </div>
    )
};

export default Chat;