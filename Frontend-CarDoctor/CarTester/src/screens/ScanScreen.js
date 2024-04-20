import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Make sure this path is correct
import useScanCodes from '../hooks/useScanCodes';
import { useNavigation } from '@react-navigation/native';


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
      // Optionally, navigate to the login or welcome screen after signing out
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

  return (
    <View style={styles.container}>
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
              <TouchableOpacity onPress={handleLogout} style={[styles.touchableButton, styles.logoutButton]}>
                <Text style={styles.buttonText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
            
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonContainer: {
    width: '80%', 
  },
  buttonWrapper: {
    marginVertical: 10, 
  },
  touchableButton: {
    width: '100%',
    height: 50, 
    backgroundColor: '#841584', 
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 30, 
  },
  logoutButton: {
    backgroundColor: '#FF5733', 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16, 
  },
});

export default Scan;
