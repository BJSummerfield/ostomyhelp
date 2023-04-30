import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { zipCode, addresses } = await req.json()

  if (!zipCode || !addresses || !Array.isArray(addresses) || addresses.length === 0) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const destinations = addresses.join('|');
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${zipCode}&destinations=${destinations}&units=imperial&key=${apiKey}`;

    const response = await axios.get(url);
    const data = await response.data
    console.log(JSON.stringify(data.rows[0]))
    if (data.status !== 'OK') {
      return NextResponse.json({ message: 'Error fetching distance data' }, { status: 500 });
    }

    const distances = data.rows[0].elements.map((element: any, index: number) => ({
      address: addresses[index],
      distance: element.status === 'OK' ? element.distance : 'N/A',
    }));
    console.log(distances)
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
