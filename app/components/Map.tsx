import React, { Component, createRef } from 'react';

import log from 'loglevel';

interface Position {
  lat: number;
  lng: number;
}
interface POV {
  heading: number;
  pitch: number;
}

const mapStyle = {
  height: '50vh',
  width: '80%'
};

interface Props {
  googleApi: any;
}

interface State {
  position: Position;
  pov: POV;
}

const initialState: State = {
  position: { lat: 33.8520094, lng: -84.2745642 },
  pov: {
    heading: 108,
    pitch: 5
  }
};

export default class Map extends Component<Props, State> {
  public state: State = initialState;

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
    try {
      const m = this.mapRef.current;
      const map = new this.props.googleApi.Map(m, {
        center: this.state.position,
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

  private createPano(map: any) {
    try {
      const panoDiv = this.panoRef.current;
      const panorama = new this.props.googleApi.StreetViewPanorama(panoDiv, {
        position: this.state.position,
        pov: {
          heading: this.state.pov.heading,
          pitch: this.state.pov.pitch,
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
