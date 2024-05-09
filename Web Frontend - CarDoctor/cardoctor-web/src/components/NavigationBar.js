import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; 

const NavigationBar = () => {
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