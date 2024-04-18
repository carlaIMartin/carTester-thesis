import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import useCodeType from '../hooks/useCodeType';
import { auth } from '../config/firebaseConfig';
import { BarChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape'

const ChartScreen = () => {
    const { handleCodeData } = useCodeType();
    const [code, setCode] = useState(null);
    const [groupedData, setGroupedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await handleCodeData();
                setCode(result);
                console.log("DATA FETCHED");
                console.log(result);

                // Group the data by "command" attribute
                const data = {};
                result.forEach(item => {
                    const command = item.command;
                    if (!data[command]) {
                        data[command] = [];
                    }
                    data[command].push(item);
                });

                setGroupedData(data);

                console.log("GROUPED DATA");
                console.log(data);
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
        
    }, []); // Dependency array is empty to run the effect only once

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Chart Screen</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView>
            {code && Object.keys(groupedData).map(command => (
                <View key={command}>
                    <Text>{command}</Text>
                    <BarChart
                        style={{ height: 200 }}
                        data={groupedData[command].map(item => Number(item.response_code))}
                        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </BarChart>
                </View>
            ))}
        </ScrollView>
    );
};

export default ChartScreen;