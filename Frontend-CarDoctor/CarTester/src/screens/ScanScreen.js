import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import useScanCodes from '../hooks/useScanCodes';

const Scan = ({ navigation }) => {
  const { result, handleScanCodeSubmit, isSubmitting, hasBeenSubmitted } = useScanCodes();
  const [scanClicked, setScanClicked] = useState(false);

  const handlePress = async () => {
    console.log('Button pressed');
    const responseCategory = await handleScanCodeSubmit(/* code data here */);
    navigation.navigate('CategoriesScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {isSubmitting ? (
          <ActivityIndicator size="large" color="#841584" />
        ) : (
          <TouchableOpacity
            onPress={handlePress}
            style={styles.touchableButton}
          >
            <Text style={styles.buttonText}>SCAN NOW</Text>
          </TouchableOpacity>
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
    height: 60, 
    borderRadius: 30, 
    overflow: 'hidden',
  },
  touchableButton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#841584', 
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 30, rs
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16, 
  },
});

export default Scan;
