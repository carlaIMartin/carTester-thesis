import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native';
import { auth } from '../config/firebaseConfig';

const categories = ['Engine', 'Sensors', 'ECU', 'Cluster', 'Nox', 'Chassis', "Unknown"];
const image = require("../../assets/sportscar.jpg");
const CategoriesScreen = ({ navigation }) => {
  const [categoriesWithProblems, setCategoriesWithProblems] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const checkCategoriesForProblems = async () => {
      let tempCategoriesWithProblems = [];

      for (const category of categories) {
        try {
          const response = await fetch(`http://192.168.68.1:8080/codeTypeAndUser/${category}/${user.email}`);
          const data = await response.json();

          const hasProblem = data.some(item => item.problem);
          if (hasProblem) {
            tempCategoriesWithProblems.push(category);
          }
        } catch (error) {
          console.error('Error fetching data for category:', category, error);
        }
      }

      setCategoriesWithProblems(tempCategoriesWithProblems);
    };

    checkCategoriesForProblems();
  }, []);

  const handleCategoryPress = async (category) => {
    try {
      const responseCategory = await fetch(`http://192.168.68.1:8080/codeTypeAndUser/${category}/${user.email}`);
      const data = await responseCategory.json();
      navigation.navigate('ResultsScreen', { data });
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={categoriesWithProblems.includes(item) ? styles.errorButton : styles.button}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <View style={styles.overlay} />
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.row}
      />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'hsl(0, 0%, 77%)',
    opacity: 0.1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#695585',
    padding: 20,
    borderRadius: 5,
    margin: 10,
    flex: 1, 
    height: Dimensions.get('window').width / 2 - 40, 
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  errorButton: {
    backgroundColor: 'rgb(229, 31, 31)',
    opacity : 0.6,
    padding: 20,
    borderRadius: 5,
    margin: 10,
    flex: 1,
    height: Dimensions.get('window').width / 2 - 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoriesScreen;
