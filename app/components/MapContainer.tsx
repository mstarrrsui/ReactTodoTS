import React, { Component, createRef } from 'react';

import log from 'loglevel';
import { Location } from '../types/GoogleMaps';
import injectGoogleMapsAPI, { GoogleMapsProps } from './hoc/injectGoogleMapsAPI';

import Pano from './Pano';

const mapStyle: React.CSSProperties = {
  height: '40vh',
  width: '100%',
  marginBottom: '20px'
};

type Props = {
  location: Location;
} & GoogleMapsProps;

class MapContainer extends Component<Props> {
  private mapRef = createRef<HTMLDivElement>();
  private map: any = null;

  constructor(props: Props) {
    super(props);
    this.createMap = this.createMap.bind(this);
    this.setStreetView = this.setStreetView.bind(this);
  }

  componentDidUpdate() {
    const { location } = this.props;

    if (this.map) {
      log.debug(`map.panTo...`);
      this.map.panTo({ lat: location.position.lat, lng: location.position.lng });
    } else if (this.mapRef) {
      log.debug(`creating map...`);
      this.map = this.createMap();
      log.debug(this.map);
    }
  }

  private setStreetView(pano: any): void {
    log.debug(`setting street view.. ${pano}   map:${this.map}`);
    this.map.setStreetView(pano);
  }

  private createMap(): google.maps.Map | undefined {
    const { location, googleApi } = this.props;
    try {
      const m = this.mapRef.current;
      const map: google.maps.Map = new googleApi.Map(m, {
        center: location.position,
        zoom: 16
      });

      return map;
      // const coordInfoWindow = new api.InfoWindow();
      // coordInfoWindow.setContent('MIKE!');
      // coordInfoWindow.setPosition(mikeHouse);
      // coordInfoWindow.open(map);
    } catch (e) {
      log.error('Error occurred creating map');
      log.error(e);
      return undefined;
    }
  }

  render() {
    const { location, googleApi, apiIsLoading } = this.props;

    if (apiIsLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div style={mapStyle} ref={this.mapRef} />
        <Pano googleApi={googleApi} location={location} setStreetView={this.setStreetView} />
      </div>
    );
  }
}

export default injectGoogleMapsAPI(MapContainer);
