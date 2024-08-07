import React, { useState } from 'react';
import { auth } from '../config/firebaseConfig';

const useScanCodes = () => {
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const user = auth.currentUser;

  const handleScanCodeSubmit = async (codeData) => {
    setIsSubmitting(true);
    try {
      console.log('Code data is ----------------------------- :', user.email);
      const scanResponse = await fetch(`http://localhost:8080/scanCodes/${user.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(codeData),
      });

      const codes = await fetch(`http://localhost:8080/codes/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!scanResponse.ok) {
        throw new Error('Something went wrong!');
      }

      const result = await codes.json();
      setResult(result);
      alert('Success: Code scanned successfully!'); 
      console.log(result);

    } catch (error) {
      alert('Error: Failed to scan the code!'); 
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setHasBeenSubmitted(true);
    }
  };

  return { result, handleScanCodeSubmit, isSubmitting, hasBeenSubmitted };
};

export default useScanCodes;
