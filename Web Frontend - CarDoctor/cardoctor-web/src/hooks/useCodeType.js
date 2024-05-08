import React from 'react';
import { auth } from '../config/firebaseConfig';

const useCodeType = () => {
  const user = auth.currentUser;
  console.log('user:', user);

  const handleCodeData = async () => {
    try {
      const codesResponse = await fetch(`http://localhost:8080/codes/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!codesResponse.ok) {
        throw new Error('Something went wrong!');
      }

      const result = await codesResponse.json();
      return result; // Return result for use in the component
    } catch (error) {
      window.alert(`Error: ${error.message || 'Failed to fetch data'}`); // Using browser alert
      throw error; // Rethrow to handle it in the component
    }
  };

  const handleChartData = async (page, pageSize = 10) => {
    try {
      const url = `http://localhost:8080/codesPageable/${user.email}?page=${page}&size=${pageSize}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      console.log('igensss:', result);
      return result; // Return result for use in the component
      
    } catch (error) {
      window.alert(`Error: ${error.message || 'Failed to fetch data'}`); // Using browser alert
      throw error; // Rethrow to handle it in the component
    }
  };

  const handleCodeByOrder = async (orderNumber) => {
    try {
      const codesResponse = await fetch(`http://localhost:8080/codeByOrderAndUsername/${user.email}/${orderNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!codesResponse.ok) {
        throw new Error('Something went wrong!');
      }

      const result = await codesResponse.json();
      window.alert('Success: Data fetched successfully!'); // Using browser alert
      return result; 

    } catch (error) {
      window.alert(`Error: ${error.message || 'Failed to fetch data'}`); // Using browser alert
      throw error; 
    }
  }

  return { handleCodeData, handleCodeByOrder, handleChartData };
};

export default useCodeType;
