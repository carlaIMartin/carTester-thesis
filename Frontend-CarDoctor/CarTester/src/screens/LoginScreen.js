import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const image = require("../../assets/carLogin.jpg");

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <View style={styles.overlay} />
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            style={styles.input} 
            placeholderTextColor="#666"  
          />
          <TextInput 
            placeholder="Password" 
            value={password} 
            secureTextEntry 
            onChangeText={setPassword} 
            style={styles.input}
            placeholderTextColor="#666"  
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 250,
    width: '80%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '100',  
    height: 50,     
    backgroundColor: '#FFF',
    padding: 15,    
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,   
  },
  button: {
    backgroundColor: "#E5C3BB",
    width: "90%",
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 5,
    marginTop: -20,
  },
  buttonText: {
    color: "#5A190B",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
