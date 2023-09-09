'use client'
import { useState } from 'react';
import axios from 'axios';
import FacilityList from './FacilityList';
import { Facility } from './types';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);

  const getDistances = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post('/api/distance', {
      zipCode,
    });

    setFacilities(response.data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 flex items-center justify-center">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white">
            <div className="border-t-4 border-indigo-600 border-solid rounded-full animate-spin h-16 w-16"></div>
          </div>
        </div>
      )}
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
            <p className="mt-2 text-sm text-gray-500">*This is a resource, please check with your personal insurance to verify coverage/pre-authorization requirements prior to making an appointment. This information is updated as often as possible.</p>
            <p className="text-gray-800">Providers please &nbsp;
              <a target="_blank" className="text-blue-500 underline visited:text-purple-500" href="https://docs.google.com/forms/d/e/1FAIpQLSep0S-ilIHhrZbhfdXqhoXAk_AfOCwr3XrmpIKnuF4v6EiH4w/viewform?usp=sf">
                follow this link
              </a>
              &nbsp; to add or change your facilities information.
            </p>
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

