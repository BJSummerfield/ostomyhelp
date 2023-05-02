// pages/api/distance.ts
import { NextResponse } from 'next/server';
import { data } from '../../utils'
import axios from 'axios';

const chunkArray = (array: string[], chunkSize: number) => {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
};

const fetchDistances = async (zipCode: string, facilities: string[], apiKey: string) => {
  const destinations = facilities.join('|');
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
  const facilities = data
 console.log(facilities)
  if (!zipCode || !facilities || !Array.isArray(facilities) || facilities.length === 0) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY || ""
    const maxDestinations = 25;
    const onlyAddressess = facilities.map((facility) => facility.address)
    console.log(onlyAddressess)
    const facilityChunks = chunkArray(onlyAddressess, maxDestinations);

    const distanceMatrixResults = await Promise.all(
      facilityChunks.map((facilityChunk) => fetchDistances(zipCode, facilityChunk, apiKey))
    );

    const facilitiesWithDistance = distanceMatrixResults.flat().map((element: any, index: number) => ({
      ...facilities[index],
      distance: element.status === 'OK' ? element.distance : {text: "N/A"},
    }));

    facilitiesWithDistance.sort((a: any, b: any) => {
      if (a.distance.text === 'N/A') {
        return 1;
      } else if (b.distance.text === 'N/A') {
        return -1;
      } else {
        return a.distance.value - b.distance.value;
      }
    });
console.log(facilitiesWithDistance)
    return NextResponse.json(facilitiesWithDistance);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
