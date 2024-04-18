import React from 'react';
import { Alert } from 'react-native';
import { auth } from '../config/firebaseConfig';

const useCodeType = () => {
  const user = auth.currentUser;

  const handleCodeData = async () => {
    try {
      const codesResponse = await fetch(`http://192.168.68.1:8080/codes/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!codesResponse.ok) {
        throw new Error('Something went wrong!');
      }

      const result = await codesResponse.json();
      Alert.alert('Success', 'Data fetched successfully!', [{ text: 'OK' }]);
      return result; // Return result for use in the component
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch data', [{ text: 'OK' }]);
      throw error; // Rethrow to handle it in the component
    }
  };

  return { handleCodeData };
};

export default useCodeType;
