// googleMap.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = ({
  userLocation,
  addresses,
  onGoogleMapsReady,
  onSortedAddressesUpdate,
}) => {
  const mapRef = useRef();
  const markersRef = useRef([]);
  const [google, setGoogle] = useState(null);

  const geocodeAddresses = async (addresses) => {
    const geocoder = new google.maps.Geocoder();
    const coordsPromises = addresses.map((address) =>
      new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            resolve(results[0].geometry.location);
          } else {
            reject(`Geocode error: ${status}`);
          }
        });
      })
    );

    return Promise.all(coordsPromises);
  };

  const addMarkers = (map, locations) => {
    locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      markersRef.current.push(marker);
    });
  };

  const sortAddressesByDistance = (
    google,
    userLocation,
    addresses,
    locations
  ) => {
    const userLatLng = new google.maps.LatLng(userLocation);

    const distances = locations.map((location, index) => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        userLatLng,
        location
      );
      return { index, distance };
    });

    distances.sort((a, b) => a.distance - b.distance);

    return distances.map((item) => addresses[item.index]);
  };

// googleMap.tsx
useEffect(() => {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API,
    version: 'weekly',
    libraries: ['geometry'],
  });

  loader.load().then(() => {
    setGoogle(google.maps);
    onGoogleMapsReady(google.maps);
  });
}, []);

  useEffect(() => {
    if (google && userLocation && mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 12,
      });

      (async () => {
        try {
          const locations = await geocodeAddresses(addresses);
          addMarkers(map, locations);

          // Sort addresses by distance
          const sortedAddresses = sortAddressesByDistance(
            google,
            userLocation,
            addresses,
            locations
          );
          onSortedAddressesUpdate(sortedAddresses);
        } catch (error) {
          console.error('Failed to geocode addresses:', error);
        }
      })();
    }
  }, [google, userLocation]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }} ref={mapRef}></div>
  );
};

export default GoogleMap;
