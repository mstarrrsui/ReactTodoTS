import React, { Component } from 'react';

import { Location } from '../types/GoogleMaps';
import GoogleMapsAPIWrapper from './GoogleMapsAPIWrapper';

import Map from './Map';
import Pano from './Pano';

import log from 'loglevel';

const mapStyle: React.CSSProperties = {
  height: '50vh',
  width: '100%'
};

interface Props {
  location: Location;
}

interface State {
  map: any;
}

const initialState: State = {
  map: null
};

export default class MapContainer extends Component<Props, State> {
  public state: State = initialState;

  public onMapCreate = (map: any) => {
    log.debug('MapContainer - onMapCreate');
    log.debug(map);
    this.setState(() => ({
      map
    }));
  };

  public componentDidUpdate(prevProps: Props) {
    log.debug('MapContainer - updated');
    const { location } = this.props;
    //move map
    this.state.map.panTo({ lat: location.position.lat, lng: location.position.lng });
  }

  public render() {
    const { location } = this.props;
    const { map } = this.state;

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
