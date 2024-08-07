import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import useCodeType from '../hooks/useCodeType';
import { auth } from '../config/firebaseConfig';
import { BarChart,XAxis, YAxis, Grid } from 'react-native-svg-charts';
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', ...styles.backgroundColor }}>
                <Text>Chart Screen</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {code && Object.keys(groupedData).map(command => {
                
                const responseCodes = groupedData[command].map(item => Number(item.response_code));
                const minValue = Math.min(...responseCodes);
                const maxValue = Math.max(...responseCodes);

                return (
                    <View key={command} style={{ flex: 1, alignItems: 'center' }}>
                            <Text>{command}</Text> 
                    
                    <View key={command} style={{ flexDirection: 'row', height: 200, padding: 20 }}>
                       
                        <YAxis
                            data={responseCodes}
                            contentInset={{ top: 20, bottom: 20 }}
                            svg={{ fontSize: 10, fill: 'black' }}
                            numberOfTicks={5}  
                            formatLabel={(value) => `${value}`}
                            style={{ marginBottom: -20 }}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <BarChart
                                style={{ flex: 1 }}
                                data={responseCodes}
                                svg={{ fill: 'hsl(195, 40%, 52%)' }}
                                contentInset={{ top: 20, bottom: 20 }}
                            >
                                <Grid />
                            </BarChart>
                            <XAxis
                                style={{ marginHorizontal: -10, height: 20 }}
                                data={groupedData[command]}
                                formatLabel={(value, index) => groupedData[command][index].orderNumber}
                                contentInset={{ left: 20, right: 20 }}
                                svg={{ fontSize: 10, fill: 'black' }}
                            />
                        </View>
                    </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(244,237,221,255)',
    },
    backgroundColor: {  
        backgroundColor: 'rgba(244,237,221,255)',
    },
};

export default ChartScreen;