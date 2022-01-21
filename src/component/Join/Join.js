import React, { useState } from 'react';
import "./Join.css";
import logo from "../../Images/gochat2.png";
import { Link } from "react-router-dom";

let user;

const Join = () => {

    const [name, setName] = useState("");

    const sendUser = () => {
        user = document.getElementById("joinInput").value;
        document.getElementById("joinInput").value = "";
    }

    return (
        <div className='Joinpage'>
            <div className="JoinContainer">
                <img src={logo} alt="logo" />
                <h1>Go Chat</h1>
                <input onChange={(e) => setName(e.target.value)} type="text" id="joinInput" placeholder='Enter Your Name' />
                <Link onClick={(e) => !name ? e.preventDefault() : ""} to="/chat"><button className='joinbtn' onClick={sendUser}>Login</button></Link>
            </div>
        </div>
    )
};

export default Join;
export { user }
