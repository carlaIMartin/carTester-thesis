import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const PartsScreen = ({ route }) => {
    const parts = route.params?.parts || [];

    useEffect(() => {
        console.log(parts); 
    }, [parts]);

    const handlePress = (part) => {
        console.log(part); 
        
    };

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
        marginVertical: 5, //margin for separation between buttons
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        
    },
});

export default PartsScreen;
