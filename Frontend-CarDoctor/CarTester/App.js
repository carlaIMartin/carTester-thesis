import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


import {app} from './src/config/firebaseConfig';


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
import CodeChartScreen from './src/screens/CodeChartScreen';
import SuggestionScreen from './src/screens/SuggestionScreen';  




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Authenticated Stack
const ScanStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ScanScreen" component={Scan} options={{ headerShown: true }} />
    <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ headerShown: true }} />
    <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="PartsScreen" component={PartsScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="ChartScreen" component={ChartScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="SnapshotsScreen" component={SnapshotsScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="CodesSnapshotScreen" component={CodesSnapshotScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="CodeChartScreen" component={CodeChartScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="SuggestionScreen" component={SuggestionScreen} options={{ headerShown: true }}/>
  </Stack.Navigator>
);

// Unauthenticated Stack
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: true }}/>
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

    return unsubscribe; 
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
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'black', 
            tabBarInactiveTintColor: 'gray', 
            tabBarStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              display: 'flex'
            },
          }}
        >
          <Tab.Screen name="Scan" component={ScanStack} options={{ headerShown: false }} />
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
