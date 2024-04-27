import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { auth } from '../config/firebaseConfig';

const CodeChartScreen = ({ route }) => {
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(true);
    const { name } = route.params;
    const user = auth.currentUser;

    useEffect(() => {
        const fetchCommands = async () => {
            try {
                const response = await fetch(`http://192.168.68.1:8080/getCodesByCommandAndUser/${name}/${user.email}`);
                const data = await response.json();
                setCommands(data.map(item => ({
                    ...item,
                    response_code: parseFloat(item.response_code) // Convert to number
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Create the data structure for the BarChart
    const chartData = commands.map(c => ({
        value: c.response_code,
        svg: {
            fill: 'rgba(134, 65, 244, 0.8)',
        },
    }));

    // Calculate min and max for the Y-axis
    const yMin = Math.min(...chartData.map(c => c.value));
    const yMax = Math.max(...chartData.map(c => c.value));

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 10 }}>
                <YAxis
                    data={chartData}
                    yAccessor={({ item }) => item.value}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => value.toString()}
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 10 }}
                    data={chartData}
                    yAccessor={({ item }) => item.value}
                    xAccessor={({ index }) => index}
                    contentInset={{ top: 20, bottom: 20 }}
                    yMin={yMin}
                    yMax={yMax}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                >
                    <Grid />
                </BarChart>
            </View>
            <XAxis
                style={{ marginHorizontal: -10, height: 20 }}
                data={commands} // Here we use the original commands array
                formatLabel={(value, index) => commands[index].orderNumber.toString()}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 10, fill: 'black' }}
            />
        </ScrollView>
    );
};

export default CodeChartScreen;
