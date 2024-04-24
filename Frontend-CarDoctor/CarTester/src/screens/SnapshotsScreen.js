import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Button } from 'react-native';
import { user, auth  } from '../config/firebaseConfig';
import navigation from '@react-navigation/native';



const SnapshotsScreen = ({navigation}) => {
    const [number, setNumber] = useState(0);
    const user = auth.currentUser;

    useEffect(() => {
      const getMaxNumber = async () => {
          try {
            const response = await fetch(`http://192.168.68.1:8080/getMaxNumber/${user.email}`);
            const text = await response.text(); 
                const num = parseInt(text, 10); 
                setNumber(num);
            
          } catch (error) {
            console.error('There was an error fetching the data:', error);
          }
        };

        getMaxNumber();
      }, []);

    const handleSnapshotPress = async (orderNumber) => {
    
        console.log(`You clicked on ${orderNumber}`);
        
        try {
          const responseSnapshot= await fetch(`http://192.168.68.1:8080/codeByOrderAndUsername/${user.email}/${orderNumber}`);
          const data = await responseSnapshot.json();
          
          
          
          navigation.navigate('CodesSnapshotScreen', {data});

          
        } catch (error) {
          console.error('There was an error fetching the data:', error);
        }
      
      };

    
      const numbers = Array.from({ length: number }, (_, i) => i + 1);
    //  console.log(number + " number")
    // const numbers = Array.from({ length: number }, (_, i) => i + 1);

    return (
      <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {numbers.map((snapshot, index) => (
                  <TouchableOpacity
                      key={index}
                      style={styles.button}
                      onPress={() => handleSnapshotPress(snapshot)}
                      activeOpacity={0.7}
                  >
                      <Text style={styles.buttonText}>{snapshot}</Text>
                  </TouchableOpacity>
              ))}
          </ScrollView>
      </View>
  );
};
    
    
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      scrollViewContainer: {
        alignItems: 'center',
        paddingTop: 20,
      },
      button: {
        backgroundColor: '#695585',
        padding: 15,
        borderRadius: 5,
        margin: 10,
        width: '80%',
        alignItems: 'center',
      },
      errorButton: {
        backgroundColor: '#6b290f',
        padding: 15,
        borderRadius: 5,
        margin: 10,
        width: '80%',
        alignItems: 'center',
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
      },
    });

export default SnapshotsScreen;