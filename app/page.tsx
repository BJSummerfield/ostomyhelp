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
    <div className="min-h-screen bg-gray-100" >
        <div className="flex items-center justify-center bg-cover bg-center h-96 " style={{ backgroundImage: 'url(/banner.jpg)' }}>
        <div className='p-8 text-center'>
          <div className='max-w-2xl mx-auto py-4 bg-white rounded-lg shadow-2xl'>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-5xl font-semibold text-indigo-600 tracking-wide uppercase">FindmyNurse</h1>
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mt-2">a Chicagoland ostomy resource</h2>
            </div>
            <h2 className="text-base pt-8 font-semibold text-indigo-600 tracking-wide uppercase">Enter your zip code*</h2>
            <form onSubmit={getDistances}>
              <input
                className="text-center h-10 text-2xl mt-2 border-2 focus:border-indigo-800 block mx-auto border-indigo-500 rounded-md"
                type="text"
                pattern="[0-9]*"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
              <button className="bg-indigo-600 p-2 rounded-md m-2 text-white" type="submit">Submit</button>
            </form>
            <p className="mt-2 text-sm text-gray-500">*This is a resource, please check with your personal insurance to verify coverage/pre-authorization requirements prior to making an appointment.</p>
          </div>
        </div>
        </div>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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

