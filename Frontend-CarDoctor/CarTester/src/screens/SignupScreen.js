import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import firebase from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';



const image = require("../../assets/carLogin.jpg");


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carType, setCarType] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        // Optionally add user to your database
        // db.collection('users').doc(user.uid).set({
        //   email: user.email,
        //   carType: carType,
        //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // });
  
        // Call your registerUserCar API
        registerUserCar(email, carType);
      })
      .catch(error => {
        alert(error.message);
      });
  };
  
  const registerUserCar = (username, carBrand) => {
    fetch(`http://192.168.68.1:8080/registerUserCar/${username}/${carBrand}` , {
      method: 'POST',
    })
    .then(response => response.text())
    .then(data => {
      console.log('Car registered:', data);
    })
    .catch((error) => {
      console.error('Error registering car:', error);
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
        

          <TextInput
            placeholder="Car Type"
            value={carType}
            onChangeText={setCarType}
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
    backgroundColor: 'rgba(hsla(280, 20%, 12%, 0.5))',
  },
  input: {
    width: '100',  
    height: 50,     
    backgroundColor: '#E5C3BB',
    padding: 15,    
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,   
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
export default SignUpScreen;
