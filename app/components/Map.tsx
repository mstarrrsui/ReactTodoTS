import React, { Component, createRef } from 'react';
import log from 'loglevel';
import { Location } from '../types/GoogleMaps';

interface Props {
  googleApi: any;
  style: React.CSSProperties;
  location: Location;
  onMapCreate(map: google.maps.Map | undefined): void;
}

export default class Map extends Component<Props> {
  private mapRef = createRef<HTMLDivElement>();

  componentDidMount() {
    const m = this.createMap();
    if (this.props.onMapCreate) {
      this.props.onMapCreate(m);
    }
  }

  private createMap(): google.maps.Map | undefined {
    const { location } = this.props;
    try {
      const m = this.mapRef.current;
      const map: google.maps.Map = new this.props.googleApi.Map(m, {
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
    return <div style={this.props.style} ref={this.mapRef} />;
  }
}
