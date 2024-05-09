import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SuggestionScreen.css'; // Ensure you create this CSS file for styling

const SuggestionScreen = () => {
    const location = useLocation();
    const links = location && location.state ? location.state.data : [];
    useEffect(() => {
        console.log("url is" + links); 
    }, [links]);

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="container">
            <div className="scrollViewContainer">
                {links.map((link, index) => (
                    <button key={index} className="button" onClick={() => openLink(link)}>
                        {link}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SuggestionScreen;