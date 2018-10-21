import React, { Component, createRef } from 'react';

import log from 'loglevel';

const mapStyle = {
  height: '600px'
};

interface Props {
  googleApi: any;
}

export default class Map extends Component<Props> {
  private mapRef = createRef<HTMLDivElement>();

  public componentDidMount() {
    this.createMap(this.props.googleApi);
  }

  public render() {
    return <div style={mapStyle} ref={this.mapRef} />;
  }

  private createMap(api: any) {
    try {
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
    } catch (e) {
      log.error('Error occurred creating map');
      log.error(e);
    }
  }
}
