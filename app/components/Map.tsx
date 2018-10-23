import React, { Component, createRef } from 'react';
import { Position, POV } from '../types/GoogleMaps';

import log from 'loglevel';

interface Props {
  googleApi: any;
  style: React.CSSProperties;
  location: {
    position: Position;
    pov: POV;
  };
  onMapCreate(map: any): void;
}

export default class Map extends Component<Props> {
  private mapRef = createRef<HTMLDivElement>();
  private panoRef = createRef<HTMLDivElement>();

  public componentDidMount() {
    const m = this.createMap();
    if (this.props.onMapCreate) {
      this.props.onMapCreate(m);
    }
  }

  public render() {
    return <div style={this.props.style} ref={this.mapRef} />;
  }

  private createMap() {
    const { location } = this.props;
    try {
      const m = this.mapRef.current;
      const map = new this.props.googleApi.Map(m, {
        center: location.position,
        zoom: 14
      });

      return map;
      // const coordInfoWindow = new api.InfoWindow();
      // coordInfoWindow.setContent('MIKE!');
      // coordInfoWindow.setPosition(mikeHouse);
      // coordInfoWindow.open(map);
    } catch (e) {
      log.error('Error occurred creating map');
      log.error(e);
    }
  }
}
