import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const SnapshotsScreen = ({ navigation }) => {
    const [number, setNumber] = useState(0);
    const user = auth.currentUser;
    const image = require("../../assets/bmw.jpg");

    useFocusEffect(
        React.useCallback(() => {
            const getMaxNumber = async () => {
                if (user) {
                    try {
                        const response = await fetch(`http://192.168.68.1:8080/getMaxNumber/${user.email}`);
                        const text = await response.text(); 
                        const num = parseInt(text, 10); 
                        setNumber(num);
                    } catch (error) {
                        console.error('There was an error fetching the data:', error);
                    }
                } else {
                    console.log('User not found');
                    setNumber(0); // Reset number or handle accordingly when there is no user logged in
                }
            };

            getMaxNumber();
        }, [user]) // Dependency array includes user, effect reruns when user changes
    );

    const handleSnapshotPress = async (orderNumber) => {
        console.log(`You clicked on ${orderNumber}`);
        try {
            const responseSnapshot = await fetch(`http://192.168.68.1:8080/codeByOrderAndUsername/${user.email}/${orderNumber}`);
            const data = await responseSnapshot.json();
            navigation.navigate('CodesSnapshotScreen', { data });
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        }
    };

    const numbers = Array.from({ length: number }, (_, i) => i + 1);

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
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
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        
    },
    scrollViewContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    button: {
        backgroundColor: 'hsl(198, 34%, 32%)',
        padding: 15,
        borderRadius: 8,
        margin: 10,
        width: '100%',
        height: 60,
        alignItems: 'center',
        marginLeft: 150,
        marginRight: 150,
        opacity: 0.8,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        
      },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SnapshotsScreen;
