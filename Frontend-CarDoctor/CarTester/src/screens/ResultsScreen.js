import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { auth } from '../config/firebaseConfig';

const ResultsScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const user = auth.currentUser;
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log(data);
    filterAndSortData();
  }, [data]);

  const filterAndSortData = () => {
    const highestOrderItems = new Map();

    data.forEach(item => {
      if (!highestOrderItems.has(item.command) || highestOrderItems.get(item.command).orderNumber < item.orderNumber) {
        highestOrderItems.set(item.command, item);
      }
    });

    const sortedData = [...highestOrderItems.values()].sort((a, b) => {
      return b.problem - a.problem; // true values (problems) are considered 'greater' than false
    });

    setFilteredData(sortedData);
  };

  const handlePartsPress = async (command) => {
    console.log(`You clicked on ${command}`);
    try {
      const responseCommand = await fetch(`http://192.168.68.1:8080/getCodesByPartAndUser/${command}/${user.email}`);
      const part = await responseCommand.json();
      console.log('Part:', part);
      navigation.navigate('PartsScreen', { parts: part });
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      filterAndSortData();
    } else {
      const filteredItems = filteredData.filter(item => 
        item.command.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by Name"
        value={searchText}
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filteredData.map((item, index) => (
          <View key={index}
            style={[
              styles.itemContainer,
              item.problem ? styles.problemContainer : {}
            ]}
          >
            <Text style={styles.itemText}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Name: {item.command}</Text>
            <Text style={styles.itemText}>Category: {item.category}</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <Text style={styles.itemText}>Response Code: {item.response_code}</Text>
            <Text style={styles.itemText}>Order Number: {item.orderNumber}</Text>

            {item.problem && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePartsPress(item.command)}
              >
                <Text style={styles.buttonText}>See recommended parts</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CodeChartScreen', { name: item.command })}
            >
              <Text style={styles.buttonText}>Code chart</Text>
            </TouchableOpacity>
          </View>
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
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  problemContainer: {
    backgroundColor: '#ffcccc',
  },
  itemText: {
    fontSize: 20,
    color: '#333',
    marginVertical: 3,
  }
});

export default ResultsScreen;
