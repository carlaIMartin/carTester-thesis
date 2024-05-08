import React, { useState } from 'react';
import './ScanScreen.css'; 
import { signOut } from 'firebase/auth';
import { app, auth } from '../../config/firebaseConfig'; 
import useScanCodes from '../../hooks/useScanCodes';
import { useNavigate } from 'react-router-dom';

const Scan = () => {
  const { result, handleScanCodeSubmit, isSubmitting, hasBeenSubmitted } = useScanCodes();
  const navigate = useNavigate();
  const [scanClicked, setScanClicked] = useState(false);
  

  const handlePress = async () => {
    const user = auth.currentUser;
    console.log('Button pressed by user ' + user.email + ' with UID ' + user.uid);
    const responseCategory = await handleScanCodeSubmit(user.email);
    navigate('/categories');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/welcome');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleCharts = () => {
    console.log('Charts button pressed');
    navigate('/charts');
  };

  const handleCategoryPress = () => {
    console.log('Category button pressed');
    navigate('/categories');
  };

  const handleSnapshotPress = () => {
    console.log('Snapshot button pressed');
    
  };

  return (
    <div className="imageBackground" style={{ backgroundImage: `url(${require("../../assets/bmw1.jpg")})` }}>
      <div className="overlay"></div>
      <div className="container">
        <div className="buttonContainer">
          {isSubmitting ? (
            <div className="activityIndicator">Loading...</div>
          ) : (
            <>
              <button onClick={handlePress} className="touchableButton">SCAN NOW</button>
              <button onClick={handleCharts} className="touchableButton">SEE STATISTICS</button>
              <button onClick={handleCategoryPress} className="touchableButton">CATEGORIES</button>
              <button onClick={handleSnapshotPress} className="touchableButton">SNAPSHOTS</button>
              <button onClick={handleLogout} className="logoutButton">LOGOUT</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;
