import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebaseConfig';

const CodesSnapshotScreen = ({route, navigation}) => {
  const { data } = route.params || {};
  const user = auth.currentUser;
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data || []);

  useEffect(() => {
    console.log(data); 
    setFilteredData(data); // Initially set filteredData to data
  }, [data]);

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
    const filteredItems = data.filter(item => item.command.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filteredItems);
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
          <View key={index} style={[styles.itemContainer, item.problem ? styles.problemContainer : {}]}>
            <Text style={styles.itemText}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Name: {item.command}</Text>
            <Text style={styles.itemText}>Category: {item.category}</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <Text style={styles.itemText}>Response Code: {item.response_code}</Text>
            <Text style={styles.itemText}>Order Number: {item.orderNumber}</Text>

            {item.problem && (
              <TouchableOpacity style={styles.button} onPress={() => handlePartsPress(item.command)}>
                <Text style={styles.buttonText}>See recommended parts</Text>
              </TouchableOpacity>
            )}
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
  searchBar: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 5,
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
  },
});

export default CodesSnapshotScreen;
