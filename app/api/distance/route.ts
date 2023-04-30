// pages/api/distance.ts
import { NextResponse } from 'next/server';
import { data } from '../../utils'
import axios from 'axios';

const chunkArray = (array, chunkSize: number) => {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
};

const fetchDistances = async (zipCode, addresses, apiKey) => {
  const destinations = addresses.join('|');
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${zipCode}&destinations=${destinations}&units=imperial&key=${apiKey}`;

  const response = await axios.get(url);
  const data = await response.data;

  if (data.status !== 'OK') {
    throw new Error('Error fetching distance data');
  }

  return data.rows[0].elements;
};

export async function POST(req: Request) {
  const { zipCode } = await req.json()
  const addresses = data

  if (!zipCode || !addresses || !Array.isArray(addresses) || addresses.length === 0) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const maxDestinations = 25;
    const onlyAddress = addresses.map((address) => address.address)
    const addressChunks = chunkArray(onlyAddress, maxDestinations);

    const distanceMatrixResults = await Promise.all(
      addressChunks.map((addressChunk) => fetchDistances(zipCode, addressChunk, apiKey))
    );

    const distances = distanceMatrixResults.flat().map((element: any, index: number) => ({
      // address: addresses[index],
      ...addresses[index],
      distance: element.status === 'OK' ? element.distance : 'N/A',
    }));

    distances.sort((a: any, b: any) => {
      if (a.distance === 'N/A') {
        return 1;
      } else if (b.distance === 'N/A') {
        return -1;
      } else {
        return a.distance.value - b.distance.value;
      }
    });

    return NextResponse.json(distances);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
