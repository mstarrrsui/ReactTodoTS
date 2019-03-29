import React, { Component } from 'react';

import { Location } from '../types/GoogleMaps';
import injectGoogleMapsAPI, { IGoogleMapsProps } from './hoc/injectGoogleMapsAPI';

import Map from './Map';
import Pano from './Pano';

import log from 'loglevel';

const mapStyle: React.CSSProperties = {
  height: '40vh',
  width: '100%',
  marginBottom: '20px'
};

const panoStyle: React.CSSProperties = {
  height: '40vh',
  width: '60%'
};

type Props = {
  location: Location;
} & IGoogleMapsProps;

interface State {
  map: google.maps.Map | null;
}

const initialState: State = {
  map: null
};

class MapContainer extends Component<Props, State> {
  readonly state: State = initialState;



  onMapCreate = (map: google.maps.Map) => {
    log.debug('MapContainer - onMapCreate');
    log.debug(map);
    this.setState(() => ({
      map
    }));
  };



  componentDidUpdate() {
    log.debug('MapContainer - updated');
    const { location } = this.props;
    // move map
    if (this.state.map) {
      this.state.map.panTo({ lat: location.position.lat, lng: location.position.lng });
    }
  }

  render() {
    const { location, googleApi, apiIsLoading } = this.props;
    const { map } = this.state;

    if (apiIsLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div style={mapStyle}>
          <Map
            style={mapStyle}
            googleApi={googleApi}
            onMapCreate={this.onMapCreate}
            location={location}
          />
          <Pano style={panoStyle} googleApi={googleApi} map={map} location={location} />
        </div>
      );
    }
  }
}

export default injectGoogleMapsAPI(MapContainer);