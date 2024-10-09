import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getAirQualityData } from '../api';

const AirQualityMap = () => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
    const [airQuality, setAirQuality] = useState(null);

    useEffect(() => {
        // Fetch air quality data for the default location
        getAirQualityData(position[0], position[1]).then(data => setAirQuality(data.list[0]));
    }, [position]);

    return (
        <MapContainer center={position} zoom={13} style={{ height: '600px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    {airQuality ? (
                        <div>
                            <h4>Air Quality</h4>
                            <p>AQI: {airQuality.main.aqi}</p>
                            <p>PM2.5: {airQuality.components.pm2_5} µg/m³</p>
                            <p>PM10: {airQuality.components.pm10} µg/m³</p>
                        </div>
                    ) : (
                        <p>Loading air quality data...</p>
                    )}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default AirQualityMap;
