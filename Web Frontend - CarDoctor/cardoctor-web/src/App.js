import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from './config/firebaseConfig';

// Import Screens
import ScanScreen from './components/ScanComponent/ScanScreen';
import CategoriesScreen from './components/CategoriesComponent/CategoriesScreen';
// import ResultsScreen from './src/screens/ResultsScreen';
// import PartsScreen from './src/screens/PartsScreen';
import WelcomeScreen from './components/WelcomeComponent/WelcomeScreen';
import LoginScreen from './components/LoginComponent/LoginScreen'; 
import SignupScreen from './components/SignupComponent/SignupScreen'; 
import ChartScreen from './components/ChartsComponent/ChartScreen'; 
// import SnapshotsScreen from './src/screens/SnapshotsScreen';
// import CodesSnapshotScreen from './src/screens/CodesSnapshotScreen';
// import CodeChartScreen from './src/screens/CodeChartScreen';
// import SuggestionScreen from './src/screens/SuggestionScreen';  

import './App.css'; // Make sure to create App.css for styles

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<Navigate replace to="/scan" />} />
          <Route path="/scan" element={<ScanScreen />} />
          <Route path="/charts" element={<ChartScreen />} />
          <Route path="/categories" element={<CategoriesScreen />} />
          {/* 
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/parts" element={<PartsScreen />} />
          
          <Route path="/snapshots" element={<SnapshotsScreen />} />
          <Route path="/codesnapshots" element={<CodesSnapshotScreen />} />
          <Route path="/codechart" element={<CodeChartScreen />} />
          <Route path="/suggestions" element={<SuggestionScreen />} /> */}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="/welcome" />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
