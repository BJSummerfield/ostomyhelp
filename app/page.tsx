'use client'
// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [addresses, setAddresses] = useState([]);
  console.log(addresses)
  const getDistances = async (e: any) => {
    e.preventDefault();

    const response = await axios.post('/api/distance', {
      zipCode,
    });

    setAddresses(response.data);
  };

  return (
    <div>
      <form onSubmit={getDistances}>
        <label>
          Zip Code:
          <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>
            {address.name} - {address.address} - {address.distance.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
