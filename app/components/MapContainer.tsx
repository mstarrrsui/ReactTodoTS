import React from 'react';

import GoogleMapsAPIWrapper from './GoogleMapsAPIWrapper';
import Map from './Map';

const MapContainer = () => (
  <GoogleMapsAPIWrapper>
    {({ googleApi, apiIsLoading }) => {
      if (apiIsLoading) {
        return <div>Loading...</div>;
      }
      return (
        <div>
          <Map googleApi={googleApi} />
        </div>
      );
    }}
  </GoogleMapsAPIWrapper>
);

export default MapContainer;
