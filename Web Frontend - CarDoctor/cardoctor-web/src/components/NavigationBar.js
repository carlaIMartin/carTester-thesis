import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebaseConfig'; 
import './NavigationBar.css'; 

const NavigationBar = () => {
 
  const user = auth.currentUser;

  
  if (!user) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/snapshots">Snapshots</Link>
        </li>
        <li>
          <Link to="/charts">Statistics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;