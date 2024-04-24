import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Import your Firebase config
import {app} from './src/config/firebaseConfig';

// Import Screens
import Scan from './src/screens/ScanScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import PartsScreen from './src/screens/PartsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen'; 
import SignupScreen from './src/screens/SignupScreen'; 
import ChartScreen from './src/screens/ChartScreen'; 
import SnapshotsScreen from './src/screens/SnapshotsScreen';
import CodesSnapshotScreen from './src/screens/CodesSnapshotScreen';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Authenticated Stack
const ScanStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ScanScreen" component={Scan} />
    <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
    <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
    <Stack.Screen name="PartsScreen" component={PartsScreen} />
    <Stack.Screen name="ChartScreen" component={ChartScreen} />
    <Stack.Screen name="SnapshotsScreen" component={SnapshotsScreen} />
    <Stack.Screen name="CodesSnapshotScreen" component={CodesSnapshotScreen} />
  </Stack.Navigator>
);

// Unauthenticated Stack
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const App = () => {
  const { container } = styles;
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
 

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (initializing) {
    return (
      <View style={container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name="Scan" component={ScanStack} />
          
          
          {/* Add more Tab.Screen components for authenticated user navigation if needed */}
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});

export default App;
