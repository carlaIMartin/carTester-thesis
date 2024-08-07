import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResultsScreen.css'; 
import { auth } from '../../config/firebaseConfig';

const ResultsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || { data: [] }; 
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

    const sortedData = [...highestOrderItems.values()].sort((a, b) => b.problem - a.problem);

    setFilteredData(sortedData);
  };

  const handlePartsPress = async (command) => {
    console.log(`You clicked on ${command}`);
    try {
      const response = await fetch(`http://192.168.68.1:8080/getCodesByPartAndUser/${command}/${user.email}`);
      const part = await response.json();
      console.log('Part:', part);
      navigate('/parts', { state: { parts: part } });
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
    <div className="container" style={{ backgroundImage: `url(${require("../../assets/mustang.jpg")})` }}>
      <input
        type="text"
        className="searchBar"
        placeholder="Search by Name"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="scrollViewContainer">
        {filteredData.map((item, index) => (
          <div key={index}
            className={`itemContainer ${item.problem ? 'problemContainer' : ''}`}
          >
            <p className="itemText">ID: {item.id}</p>
            <p className="itemText">Name: {item.command}</p>
            <p className="itemText">Category: {item.category}</p>
            <p className="itemText">Description: {item.description}</p>
            <p className="itemText">Response Code: {item.response_code}</p>
            <p className="itemText">Order Number: {item.orderNumber}</p>

            {item.problem && (
              <button
                className="button"
                onClick={() => handlePartsPress(item.command)}
              >
                See recommended parts
              </button>
            )}

            <button
              className="button"
              onClick={() => navigate('/codechart', { state: { name: item.command } })}
            >
              Code chart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsScreen;
