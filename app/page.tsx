'use client'
// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [addresses, setAddresses] = useState([]);

  const getDistances = async (e:any) => {
    e.preventDefault();

    const response = await axios.post('/api/distance', {
      zipCode,
      addresses: [
        '1600 Amphitheatre Parkway, Mountain View, CA',
        '1 Infinite Loop, Cupertino, CA',
        '1 Hacker Way, Menlo Park, CA',
      ],
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
            {address.address} - {address.distance.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
