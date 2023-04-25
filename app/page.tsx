'use client'
// page.tsx
import React, { useState, useCallback } from 'react';
import GoogleMap from './googleMap';
import { geocodeAddress } from './utils';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [google, setGoogle] = useState(null);
  const [sortedAddresses, setSortedAddresses] = useState([]);

  // page.tsx
  const handleGoogleMapsReady = useCallback((googleMaps) => {
    setGoogle(googleMaps);
  }, []);

  const addresses = [
    '123 Main St, New York, NY 10001',
    '456 Broadway, New York, NY 10002',
    // Add more addresses as needed
  ];

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = async () => {
    if (!google) {
      console.error('Google Maps API is not loaded yet.');
      return;
    }

    try {
      const location = await geocodeAddress(google, zipCode);
      setUserLocation(location.toJSON());
    } catch (error) {
      console.error('Failed to geocode zip code:', error);
    }
  };

  const handleSortedAddressesUpdate = useCallback((sorted) => {
    setSortedAddresses(sorted);
  }, []);

  return (
    <div>
      <h1>Google Map Example</h1>
      <div>
        <input
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Enter your zip code"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {userLocation && (
        <GoogleMap
          userLocation={userLocation}
          addresses={addresses}
          onGoogleMapsReady={handleGoogleMapsReady}
          onSortedAddressesUpdate={handleSortedAddressesUpdate}
        />
      )}
      <div>
        <h2>Addresses sorted by distance:</h2>
        <ul>
          {sortedAddresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

