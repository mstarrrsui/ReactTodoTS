import React from 'react';

import GoogleMapsAPIWrapper from './GoogleMapsAPIWrapper';
import Map from './Map';

const MapContainer = () => (
  <GoogleMapsAPIWrapper>
    {({ googleApi, apiIsLoading }) => (
      <div>{apiIsLoading ? 'Loading' : <Map googleApi={googleApi} />}</div>
    )}
  </GoogleMapsAPIWrapper>
);

export default MapContainer;
