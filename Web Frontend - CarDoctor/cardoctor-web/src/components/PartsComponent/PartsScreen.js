import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PartsScreen.css'; // Ensure you create this CSS file for styling
import { auth } from '../../config/firebaseConfig';

const PartsScreen = () => {
    const location = useLocation();
    const parts = location && location.state ? location.state.parts : [];
    const [isLoading, setIsLoading] = useState(false); // New state variable for loading state
    const user = auth.currentUser;
    const navigate = useNavigate();

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
                navigate('/SuggestionScreen', { state: { data: categoryData } });
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
            <div className="container centered">
                <div className="loader"></div>
                <p>Searching the web for parts</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="scrollViewContainer">
                {parts.map((item, itemIndex) => (
                    Array.isArray(item.parts) && item.parts.map((part, partIndex) => (
                        <button 
                            key={partIndex} 
                            className="button"
                            onClick={() => handlePress(part)}
                        >
                            {part}
                        </button>
                    ))
                ))}
            </div>
        </div>
    );
};

export default PartsScreen;