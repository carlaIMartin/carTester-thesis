import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Scan from './src/screens/ScanScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CategoriesScreen from './src/screens/CategoriesScreen';
import useScanCodes from './src/hooks/useScanCodes';
import { createStackNavigator } from '@react-navigation/stack';
import setScanClicked from './src/screens/ScanScreen';
import React, { useState } from 'react';
import ResultsScreen from './src/screens/ResultsScreen';
import PartsScreen from './src/screens/PartsScreen';


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();

const ScanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScanScreen" component={Scan} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
      <Stack.Screen name="PartsScreen" component={PartsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const { container, scanTitle } = styles;
  const [scanPressed, setScanPressed] = useState(false);
  
  // const handleScanSubmit = (hasBeenSubmitted) => {
  //   setScanPressed(hasBeenSubmitted);
  // };
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Tab.Screen style={[scanTitle]} name="Scan" component={ScanStack} />
        {/* <Tab.Screen name="Scan" component={Scan} /> */}
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  scanTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default App;