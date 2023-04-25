export const geocodeAddress = (address) => {
  console.log(address)
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        resolve(results[0].geometry.location);
      } else {
        reject(`Geocode error: ${status}`);
      }
    });
  });
};
