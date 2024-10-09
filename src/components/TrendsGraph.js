import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { getHistoricalAirQualityData } from '../api';

const TrendsGraph = ({ lat, lon, location }) => {
    const [historicalData, setHistoricalData] = useState([]);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            const dates = ['2023-09-01', '2023-09-02', '2023-09-03']; // Example dates
            const data = await Promise.all(
                dates.map(date => getHistoricalAirQualityData(lat, lon, date))
            );
            setHistoricalData(data.map(d => d[0].AQI)); // Simplified for demo
        };

        fetchHistoricalData();
    }, [lat, lon]);

    return (
        <Plot
            data={[
                {
                    type: 'scatter',
                    x: ['2023-09-01', '2023-09-02', '2023-09-03'], // Example dates
                    y: historicalData,
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                },
            ]}
            layout={{ title: `Air Quality Trends for ${location}`, xaxis: { title: 'Date' }, yaxis: { title: 'AQI' } }}
        />
    );
};

export default TrendsGraph;
