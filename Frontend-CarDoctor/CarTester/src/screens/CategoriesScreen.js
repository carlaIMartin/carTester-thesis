import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';

const categories = ['Engine', 'Sensors', 'ECU', 'Cluster', 'Nox', 'Chassis', "Unknown"];

const CategoriesScreen = ({ navigation }) => {
  const [categoriesWithProblems, setCategoriesWithProblems] = useState([]);

  useEffect(() => {
    const checkCategoriesForProblems = async () => {
      let tempCategoriesWithProblems = [];

      for (const category of categories) {
        try {
          const response = await fetch(`http://192.168.68.1:8080/codeType/${category}`);
          const data = await response.json();

          // const hasProblem = data.some(item => ["EGR_ERROR", "FUEL_INJECT_TIMING", "RPM", "SPEED"].includes(item.command) && item.problem);
          const hasProblem = data.some(item =>  item.problem);
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
    let tempCategoriesWithProblems = [];
    let dataWithProblems = [];

    console.log(`You clicked on ${category}`);
    try {
      const responseCategory = await fetch(`http://192.168.68.1:8080/codeType/${category}`);
      const data = await responseCategory.json();

      // data.forEach(item => {
      //   if (["EGR_ERROR", "FUEL_INJECT_TIMING", "RPM", "SPEED"].includes(item.command) && item.problem) {
      //     dataWithProblems.push(item);
          
      //   }
      // });

      

      // if (dataWithProblems.length > 0) {
      //   console.log("DATA THAT HAS PROBLEMS:", dataWithProblems);
      // }

      navigation.navigate('ResultsScreen', { data });
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={categoriesWithProblems.includes(category) ? styles.errorButton : styles.button}
            onPress={() => handleCategoryPress(category)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{category}</Text>
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

export default CategoriesScreen;