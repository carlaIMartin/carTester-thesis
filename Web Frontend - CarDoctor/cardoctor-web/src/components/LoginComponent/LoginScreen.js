import React, { useState } from 'react';
import './LoginScreen.css'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../ScanComponent/ScanScreen'
import { useNavigate } from 'react-router-dom';

import { auth } from '../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigate("/scan")
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${require("../../assets/carLogin.jpg")})` }}>
      {/* <div className="overlay"></div> */}
      <div className="inputContainer">
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          secureTextEntry
        />
      </div>
      <button className="button" onClick={handleSignIn}>
        <span className="buttonText">Sign In</span>
      </button>
    </div>
  );
};

export default LoginScreen;
