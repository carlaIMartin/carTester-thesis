import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CodeSnapshotScreen.css'; // Ensure you create this CSS file for styling
import { auth } from '../../config/firebaseConfig';

const CodesSnapshotScreen = () => {
  const location = useLocation();
  const data = location && location.state ? location.state.data : [];
  const user = auth.currentUser;
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const sortedData = sortData(data);
      setFilteredData(sortedData);
    }
  }, [data]);

  const sortData = (items) => {
    return items.sort((a, b) => {
      if (a.problem && !b.problem) return -1;
      if (!a.problem && b.problem) return 1;
      return 0;
    });
  };

  const handlePartsPress = async (command) => {
    console.log(`You clicked on ${command}`);
    try {
      const responseCommand = await fetch(`http://192.168.68.1:8080/getCodesByPartAndUser/${command}/${user.email}`);
      const part = await responseCommand.json();
      console.log('Part:', part);
      navigate('/parts', { state: { parts: part } });
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (data) {
      const filteredItems = data.filter(item => item.command.toLowerCase().includes(text.toLowerCase()));
      const sortedItems = sortData(filteredItems);
      setFilteredData(sortedItems);
    }
  };

  return (
    <div className="container">
      <input
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
              <button className="button" onClick={() => handlePartsPress(item.command)}>
                See recommended parts
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodesSnapshotScreen;