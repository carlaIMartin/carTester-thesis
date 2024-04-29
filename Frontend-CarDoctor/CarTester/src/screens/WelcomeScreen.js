import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WelcomeScreen = ({ navigation }) => {

  const image = require("../../assets/carrepair.jpg");
  return (
    
    <View style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to CarDoctor ! </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>      
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',  
    paddingVertical: 20,  
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#E5C3BB',
    marginTop: 70,  
  },
  buttonContainer: {
    marginBottom: 30,  
  },
  button: {
    backgroundColor: "#E5C3BB",
    width: "90%",
    paddingVertical: 20,
    alignSelf: 'center',
    borderRadius: 110,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "#5A190B",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
