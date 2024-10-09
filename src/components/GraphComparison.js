import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { getAirQualityData } from '../api';

const GraphComparison = ({ locations }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch air quality data for each location
        const fetchData = async () => {
            const promises = locations.map(loc =>
                getAirQualityData(loc.lat, loc.lon).then(data => ({
                    location: loc.name,
                    aqi: data.list[0].main.aqi,
                }))
            );
            const results = await Promise.all(promises);
            setData(results);
        };

        fetchData();
    }, [locations]);

    return (
        <Plot
            data={[
                {
                    type: 'bar',
                    x: data.map(d => d.location),
                    y: data.map(d => d.aqi),
                    marker: { color: 'blue' },
                },
            ]}
            layout={{ title: 'Air Quality Comparison (AQI)', xaxis: { title: 'Location' }, yaxis: { title: 'AQI' } }}
        />
    );
};

export default GraphComparison;
