import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PartsScreen.css'; 
import { auth } from '../../config/firebaseConfig';

const PartsScreen = () => {
    const location = useLocation();
    const parts = location && location.state ? location.state.parts : [];
    const [isLoading, setIsLoading] = useState(false); 
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(parts); 
    }, [parts]);

    const handlePress = async (part) => {
        setIsLoading(true); 
    
        try {
            
            const response = await fetch(`http://192.168.68.1:8080/getCarByUsername/${user.email}`);
            const carDataArray = await response.json(); 
            if (carDataArray.length > 0) {
                const carBrand = carDataArray[0].carBrand; 
                console.log('Car brand is: ', carBrand);
    
                
                const responseCategory = await fetch(`http://192.168.68.1:8080/scrapeParts/${part}/${carBrand}`);
                const categoryData = await responseCategory.json();
    
                console.log('Suggestion is: ', { data: categoryData });
                navigate('/suggestionscreen', { state: { data: categoryData } });
            } else {
                console.log('No car data found for user.');
            }
    
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        } finally {
            setIsLoading(false); 
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