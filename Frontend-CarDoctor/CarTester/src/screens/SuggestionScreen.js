import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';


const SuggestionScreen = ({ route }) => {
    const links = route.params?.data || [];
    useEffect(() => {
        console.log("url is" + links); 
    }, [links]);

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {links.map((link, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => openLink(link)}>
                        <Text style={styles.buttonText}>{link}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        padding: 20,
    },
    button: {
        backgroundColor: '#695585',
        padding: 15,
        borderRadius: 5,
        margin: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});

export default SuggestionScreen;