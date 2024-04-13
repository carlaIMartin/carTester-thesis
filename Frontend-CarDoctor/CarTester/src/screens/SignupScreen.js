import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={text => setPassword(text)} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
