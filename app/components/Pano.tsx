import React, { Component, createRef } from 'react';
import log from 'loglevel';
import { Location } from '../types/GoogleMaps';

const panoStyle: React.CSSProperties = {
  height: '40vh',
  width: '100%'
};

interface Props {
  googleApi: any;
  location: Location;
  setStreetView: (pano: any) => void;
}

export default class Pano extends Component<Props> {
  private panoRef = createRef<HTMLDivElement>();

  componentDidUpdate() {
    log.debug('Pano - create Pano');
    const { location, googleApi, setStreetView } = this.props;
    try {
      const panoDiv = this.panoRef.current;
      const panorama = new googleApi.StreetViewPanorama(panoDiv, {
        position: location.position,
        pov: {
          heading: location.pov.heading,
          pitch: location.pov.pitch,
          zoom: 1
        }
      });
      setStreetView(panorama);
    } catch (e) {
      log.error('Error occurred creating pano');
      log.error(e);
    }
  }

  render() {
    return <div style={panoStyle} ref={this.panoRef} />;
  }
}
