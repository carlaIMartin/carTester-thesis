import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const useCodeType = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
 

  const handleScanCodeSubmit = async (codeData) => {
    setIsSubmitting(true);
    try {
      const scanResponse = await fetch('http://192.168.68.1:8080/scanCodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(codeData),
      });

      const codes = await fetch('http://192.168.68.1:8080/codes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(codeData),
      });
       

      if (!scanResponse.ok) {
        throw new Error('Something went wrong!');
      }

      const result = await codes.json();
      Alert.alert('Success', 'Code scanned successfully!', [{ text: 'OK' }]);
      console.log(result); 
      
    } catch (error) {
      Alert.alert('Error', 'Failed to scan the code!', [{ text: 'OK' }]);
      console.error(error); 
    } finally {
      setIsSubmitting(false);
      
    }
  };
  return { handleScanCodeSubmit, isSubmitting };
};

export default useScanCodes;