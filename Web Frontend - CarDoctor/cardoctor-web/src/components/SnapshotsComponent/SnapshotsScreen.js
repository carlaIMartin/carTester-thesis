import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SnapshotsScreen.css'; 
import {auth} from '../../config/firebaseConfig';

const SnapshotsScreen = () => {
    const [number, setNumber] = useState(0);
    const navigate = useNavigate();
    const user = auth.currentUser; 
    const image = require("../../assets/bmw.jpg");

    useEffect(() => {
        const getMaxNumber = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://192.168.68.1:8080/getMaxNumber/${user.email}`);
                    const text = await response.text();
                    const num = parseInt(text, 10);  
                    setNumber(num);
                } catch (error) {
                    console.error('There was an error fetching the data:', error);
                }
            } else {
                console.log('User not found');
                setNumber(0); 
            }
        };

        getMaxNumber();
    }, [user]);

    const handleSnapshotPress = async (orderNumber) => {
        console.log(`You clicked on ${orderNumber}`);
        try {
            const responseSnapshot = await fetch(`http://192.168.68.1:8080/codeByOrderAndUsername/${user.email}/${orderNumber}`);
            const data = await responseSnapshot.json();
            navigate('/codessnapshotscreen', { state: { data } });
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        }
    };

    const numbers = Array.from({ length: number }, (_, i) => i + 1);

    console.log(numbers); 
return (
    <div className="container" style={{ backgroundImage: `url(${image})` }}>
        <div className="scrollViewContainer">
            {numbers.map((snapshot, index) => (
                <button
                    key={index}
                    className="button"
                    onClick={() => handleSnapshotPress(snapshot)}
                >
                    <span className="buttonText">{snapshot}</span>
                </button>
            ))}
        </div>
    </div>
);

};

export default SnapshotsScreen;
