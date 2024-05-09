import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useCodeType from '../../hooks/useCodeType'; 
import { auth } from '../../config/firebaseConfig';
import './ChartScreen.css';

const ChartScreen = () => {
    const { handleCodeData } = useCodeType();
    const [code, setCode] = useState(null);
    const [groupedData, setGroupedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = auth.currentUser;
    console.log('user:', user);
    useEffect(() => {
        console.log('user:', user);
        const fetchData = async () => {
            
            try {
                setLoading(true);
                const result = await handleCodeData();
                setCode(result);
                
                const data = {};
                result.forEach(item => {
                    const command = item.command;
                    if (!data[command]) {
                        data[command] = [];
                    }
                    console.log('item:', item);
                    data[command].push({ ...item, response_code: Number(item.response_code) });
                });

                setGroupedData(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.email) {
            fetchData();
        }
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>Chart Screen</div>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {code && Object.keys(groupedData).map(command => (
                <div key={command} style={{ width: '100%', height: '300px', marginBottom: '20px' }}>
                    <h2>{command}</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={groupedData[command]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="orderNumber" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="response_code" fill="hsl(195, 40%, 52%)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};

export default ChartScreen;
