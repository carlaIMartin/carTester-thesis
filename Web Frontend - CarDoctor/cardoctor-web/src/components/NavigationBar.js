import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebaseConfig'; // Import Firebase auth
import './NavigationBar.css'; 

const NavigationBar = () => {
  // Check if user is logged in
  const user = auth.currentUser;

  // If no user is logged in, return null
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