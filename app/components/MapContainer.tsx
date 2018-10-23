import React, { Component } from 'react';

import { Position, POV } from '../types/GoogleMaps';
import GoogleMapsAPIWrapper from './GoogleMapsAPIWrapper';

import Map from './Map';
import Pano from './Pano';

import log from 'loglevel';

const mapStyle: React.CSSProperties = {
  height: '50vh',
  width: '90%',
  marginTop: '20px',
  padding: '5px'
};

interface State {
  location: {
    position: Position;
    pov: POV;
  };
  map: any;
}

const initialState: State = {
  location: {
    position: { lat: 33.8520094, lng: -84.2745642 },
    pov: {
      heading: 108,
      pitch: 5
    }
  },
  map: null
};

export default class MapContainer extends Component {
  public state: State = initialState;

  public onMapCreate = (map: any) => {
    log.debug('MapContainer - onMapCreate');
    log.debug(map);
    this.setState(() => ({
      map
    }));
  };

  public render() {
    const { location, map } = this.state;

    return (
      <GoogleMapsAPIWrapper>
        {({ googleApi, apiIsLoading }) => {
          if (apiIsLoading) {
            return <div>Loading...</div>;
          }
          return (
            <div style={mapStyle}>
              <Map
                style={mapStyle}
                googleApi={googleApi}
                onMapCreate={this.onMapCreate}
                location={location}
              />
              <Pano style={mapStyle} googleApi={googleApi} map={map} location={location} />
            </div>
          );
        }}
      </GoogleMapsAPIWrapper>
    );
  }
}
