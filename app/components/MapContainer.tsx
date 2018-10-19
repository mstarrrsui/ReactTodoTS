import React, { Component, createRef } from 'react';
import { loadGoogleMapsApi } from '../util/loadGoogleMapsApi';

import log from 'loglevel';

const mapStyle = {
  height: '600px'
};

export default class MapContainer extends Component {
  private mapRef = createRef<HTMLDivElement>();

  public componentDidMount() {
    log.debug('MapContainer Mounted');
    loadGoogleMapsApi({ key: 'AIzaSyAip9DBdARvtEczeNFaQyZGEtALAFDpO6M' }).then(api => {
      log.debug('Google API loaded');
      const m = this.mapRef.current;
      const mikeHouse = { lat: 33.8519204, lng: -84.2767984 };
      const map = new api.Map(m, {
        center: mikeHouse,
        zoom: 14
      });
      const coordInfoWindow = new api.InfoWindow();
      coordInfoWindow.setContent('MIKE!');
      coordInfoWindow.setPosition(mikeHouse);
      coordInfoWindow.open(map);
    });
  }

  public render() {
    return (
      <div style={mapStyle} ref={this.mapRef}>
        Loading map...
      </div>
    );
  }
}
