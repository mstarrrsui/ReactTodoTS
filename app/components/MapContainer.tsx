import React, { Component } from 'react';

import { Location } from '../types/GoogleMaps';
// import GoogleMapsAPIWrapper from './GoogleMapsAPIWrapper';
import withGoogleMapsAPI, { IGoogleMapsProps } from './hoc/withGoogleMapsAPI';

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

interface Props extends IGoogleMapsProps {
  location: Location;
}

interface State {
  map: google.maps.Map | null;
}

const initialState: State = {
  map: null
};

class MapContainer extends Component<Props, State> {
  public state: State = initialState;

  public onMapCreate = (map: google.maps.Map) => {
    log.debug('MapContainer - onMapCreate');
    log.debug(map);
    this.setState(() => ({
      map
    }));
  };

  public componentDidUpdate() {
    log.debug('MapContainer - updated');
    const { location } = this.props;
    // move map
    if (this.state.map) {
      this.state.map.panTo({ lat: location.position.lat, lng: location.position.lng });
    }
  }

  public render() {
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

export default withGoogleMapsAPI(MapContainer);
