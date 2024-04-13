import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={text => setPassword(text)} />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default LoginScreen;
 