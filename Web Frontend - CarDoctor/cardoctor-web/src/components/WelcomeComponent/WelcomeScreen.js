import React from "react";
import { useNavigate } from "react-router-dom";
import './WelcomeScreen.css';  

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const backgroundImage = require("../../assets/carrepair.jpg"); 

  return (
    <div className="fullScreen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Welcome to CarDoctor !</h1>
        <div className="buttonContainer">
          <button
            className="button"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            className="button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
