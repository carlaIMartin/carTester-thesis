import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Make sure this path is correct
import useScanCodes from '../hooks/useScanCodes';
import { useNavigation } from '@react-navigation/native';

const image = require("../../assets/bmw1.jpg");
const Scan = ({ navigation }) => {
  const { result, handleScanCodeSubmit, isSubmitting, hasBeenSubmitted } = useScanCodes();
  const [scanClicked, setScanClicked] = useState(false);

  const handlePress = async () => {
    const user = auth.currentUser;
    console.log('Button pressed by user ' + user.email + ' with UID ' + user.uid);
    const responseCategory = await handleScanCodeSubmit(user.email);
    navigation.navigate('CategoriesScreen');
  };



  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      
      // navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleCharts = async () => {
    navigation.navigate('ChartScreen');
  }

  const handleCategoryPress = async () => {
    navigation.navigate('CategoriesScreen');
  }

  const handleSnapshotPress = async () => {
    navigation.navigate('SnapshotsScreen');
  }

  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
    <View style={styles.overlay} />
    <View style={styles.container}>
    {/* <Text style={styles.title}>Welcome, {auth.currentUser.email} ! </Text> */}
      <View style={styles.buttonContainer}>
        {isSubmitting ? (
          <ActivityIndicator size="large" color="#841584" />
        ) : (
          <>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={handlePress} style={styles.touchableButton}>
                <Text style={styles.buttonText}>SCAN NOW</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={handleCharts} style={styles.touchableButton}>
                <Text style={styles.buttonText}>SEE STATISTICS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={handleCategoryPress} style={[styles.touchableButton]}>
                <Text style={styles.buttonText}>CATEGORIES</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={handleSnapshotPress} style={[styles.touchableButton]}>
                <Text style={styles.buttonText}>SNAPSHOTS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={handleLogout} style={[ styles.logoutButton]}>
                <Text style={styles.buttonText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
            
          </>
        )}
        
      </View>
    
      
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '90%',
    marginBottom: 0,
  },
  buttonContainer: {
    width: '100%', 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(280, 100%, 10%)',
    
  },
  buttonWrapper: {
    marginVertical: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#5A190B',
    marginTop: 20,  
    marginBottom:20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  touchableButton: {
    width: '100%',
    height: 70, 
    marginBottom: 5,
    backgroundColor: 'hsl(195, 40%, 52%)', 
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 10,
    opacity: 0.9,
     
  },
  logoutButton: {
    marginTop: 180,
    width: '100%',
    height: 70, 
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 10,
    opacity: 0.7,
    backgroundColor: '#FF5733', 
  },
  buttonText: {
    color: '#5A190B',
    opacity: 1, 
    fontSize: 16, 
    fontWeight: 'bold',
  },
});

export default Scan;
