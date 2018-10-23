import React, { Component, createRef } from 'react';
import { Position, POV } from '../types/GoogleMaps';

import log from 'loglevel';

const mapStyle = {
  height: '50vh',
  width: '80%'
};

interface Props {
  googleApi: any;
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
    this.createPano(m);
  }

  public render() {
    return (
      <div>
        <div style={mapStyle} ref={this.mapRef} />
        <div style={mapStyle} ref={this.panoRef} />
      </div>
    );
  }

  private createMap() {
    const { location } = this.props;
    try {
      const m = this.mapRef.current;
      const map = new this.props.googleApi.Map(m, {
        center: location.position,
        zoom: 14
      });
      if (this.props.onMapCreate) {
        this.props.onMapCreate(map);
      }
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

  private createPano(map: any) {
    const { location } = this.props;
    try {
      const panoDiv = this.panoRef.current;
      const panorama = new this.props.googleApi.StreetViewPanorama(panoDiv, {
        position: location.position,
        pov: {
          heading: location.pov.heading,
          pitch: location.pov.pitch,
          zoom: 1
        }
      });
      map.setStreetView(panorama);
    } catch (e) {
      log.error('Error occurred creating pano');
      log.error(e);
    }
  }
}
