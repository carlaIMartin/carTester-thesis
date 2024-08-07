import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import { auth } from '../../config/firebaseConfig';

const CodeChartScreen = () => {
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { name } = location.state;
    const user = auth.currentUser;

    useEffect(() => {
        const fetchCommands = async () => {
            try {
                const response = await fetch(`http://192.168.68.1:8080/getCodesByCommandAndUser/${name}/${user.email}`);
                const data = await response.json();
                setCommands(data.map(item => ({
                    ...item,
                    response_code: parseFloat(item.response_code)
                })));
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch commands:', error);
                setLoading(false);
            }
        };

        fetchCommands();
    }, [name]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="loader"></div>
            </div>
        );
    }

    const chartData = commands.map(c => ({
        name: c.orderNumber.toString(),
        value: c.response_code,
    }));

    return (
        <div style={{ width: '100%', height: 300 }}>
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default CodeChartScreen;