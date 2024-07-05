import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesScreen.css';  
import { auth } from '../../config/firebaseConfig';

const categories = ['Engine', 'Sensors', 'ECU', 'Cluster', 'Nox', 'Chassis', "Unknown"];

const CategoriesScreen = () => {
  const image = require("../../assets/nissan.jpg"); 
  const [categoriesWithProblems, setCategoriesWithProblems] = useState([]);
  const navigate = useNavigate();
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

    if (user && user.email) {
      checkCategoriesForProblems();
    }
  }, []);

  const handleCategoryPress = async (category) => {
    try {
      const responseCategory = await fetch(`http://192.168.68.1:8080/codeTypeAndUser/${category}/${user.email}`);
      const data = await responseCategory.json();
      navigate('/results', { state: { data } });
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${image})` }}>
      {/* <div className="overlay"></div> */}
      <div className="category-grid">
        {categories.map((item, index) => (
          <button
            key={index}
            className={`category-button ${categoriesWithProblems.includes(item) ? 'error' : ''}`}
            onClick={() => handleCategoryPress(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;
