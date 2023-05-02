'use client'
import { useState } from 'react';
import axios from 'axios';
import FacilityList from './FacilityList'; 
import { Facility } from './types';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [facilities, setFacilities] = useState<Facility[]>([]);

  const getDistances = async (e: any) => {
    e.preventDefault();

    const response = await axios.post('/api/distance', {
      zipCode,
    });

    setFacilities(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-cover bg-center h-96" style={{ backgroundImage: 'url(/dr-nurse.jpg)' }}></div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Enter your zip code</h2>
          <form onSubmit={getDistances}>
            <input
              className="text-center w-1/12 h-10 text-2xl mt-5 focus:ring-indigo-500 focus:border-indigo-500 block mx-auto shadow-sm sm:test-sm border-gray-300 rounded-md"
              type="text"
              pattern="[0-9]*"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        {
          facilities ?
            <div className="mt-4 grid grid-cols-1 gap-4">
              {facilities.map((facility: Facility, index: number) => (
                <FacilityList key={index} facility={facility} />
              ))}
            </div>
            : null
        }
      </div>
    </div>
  );
}

