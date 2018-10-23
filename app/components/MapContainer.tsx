import React, { Component } from 'react';

import { Position, POV } from '../types/GoogleMaps';
import GoogleMapsAPIWrapper from './GoogleMapsAPIWrapper';

import Map from './Map';

import log from 'loglevel';

interface State {
  location: {
    position: Position;
    pov: POV;
  };
}

const initialState: State = {
  location: {
    position: { lat: 33.8520094, lng: -84.2745642 },
    pov: {
      heading: 108,
      pitch: 5
    }
  }
};

export default class MapContainer extends Component {
  public state: State = initialState;

  public onMapCreate(map: any) {
    log.debug('MapContainer - onMapCreate');
    log.debug(map);
  }

  public render() {
    return (
      <GoogleMapsAPIWrapper>
        {({ googleApi, apiIsLoading }) => {
          if (apiIsLoading) {
            return <div>Loading...</div>;
          }
          return (
            <div>
              <Map
                googleApi={googleApi}
                onMapCreate={this.onMapCreate}
                location={this.state.location}
              />
            </div>
          );
        }}
      </GoogleMapsAPIWrapper>
    );
  }
}
