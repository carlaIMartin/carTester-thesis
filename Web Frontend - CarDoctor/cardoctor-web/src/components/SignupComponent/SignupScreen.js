import React, { useState } from 'react';
import './SignupScreen.css';  
import { useNavigate } from 'react-router-dom';


import { auth } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carType, setCarType] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);

        
        registerUserCar(email, carType);
        navigate("/scan")
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const registerUserCar = (username, carBrand) => {
    fetch(`http://192.168.68.1:8080/registerUserCar/${username}/${carBrand}`, {
      method: 'POST',
    })
    .then(response => response.text())
    .then(data => {
      console.log('Car registered:', data);
    })
    .catch((error) => {
      console.error('Error registering car:', error);
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
          onChange={e => setEmail(e.target.value)}
          className="input"
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Car Type"
          value={carType}
          onChange={e => setCarType(e.target.value)}
          className="input"
        />
      </div>
      <button className="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUpScreen;
