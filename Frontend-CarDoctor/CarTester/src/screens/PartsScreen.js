import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth } from '../config/firebaseConfig';

const PartsScreen = ({ route, navigation }) => {
    const parts = route.params?.parts || [];
    const [isLoading, setIsLoading] = useState(false); // New state variable for loading state
    const user = auth.currentUser;

    useEffect(() => {
        console.log(parts); 
    }, [parts]);

    const handlePress = async (part) => {
        setIsLoading(true); // Set loading state to true before fetching data
    
        try {
            // First API call to fetch car details including carBrand
            const response = await fetch(`http://192.168.68.1:8080/getCarByUsername/${user.email}`);
            const carDataArray = await response.json(); // This is an array based on your screenshot
            if (carDataArray.length > 0) {
                const carBrand = carDataArray[0].carBrand; // Access the carBrand from the first object in the array
                console.log('Car brand is: ', carBrand);
    
                // Second API call using the fetched carBrand
                const responseCategory = await fetch(`http://192.168.68.1:8080/scrapeParts/${part}/${carBrand}`);
                const categoryData = await responseCategory.json();
    
                console.log('Suggestion is: ', { data: categoryData });
                navigation.navigate('SuggestionScreen', { data: categoryData });
            } else {
                console.log('No car data found for user.');
            }
    
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after fetching data
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#800080" />
                <Text>Searching the web for parts</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {parts.map((item, itemIndex) => (
                    Array.isArray(item.parts) && item.parts.map((part, partIndex) => (
                        <TouchableOpacity 
                            key={partIndex} 
                            style={styles.button}
                            onPress={() => handlePress(part)}
                        >
                            <Text style={styles.buttonText}>{part}</Text>
                        </TouchableOpacity>
                    ))
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
        centered: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollViewContainer: {
            padding: 20,
        },
        itemContainer: {
            backgroundColor: '#f0f0f0',
            padding: 20,
            marginVertical: 10,
            borderRadius: 5,
        },
        button: {
            backgroundColor: '#695585', 
            padding: 10,
            marginVertical: 5, 
            borderRadius: 5,
        },
        buttonText: {
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 20,
            
        },
    });


export default PartsScreen;
