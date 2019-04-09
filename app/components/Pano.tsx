import React, { useEffect, useRef } from 'react';
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

const Pano: React.FC<Props> = ({ location, googleApi, setStreetView }: Props) => {
  const panoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function createPano() {
      log.debug('Pano - create Pano');
      try {
        const panoDiv = panoRef.current;
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
    createPano();
  }, [location]);

  return <div style={panoStyle} ref={panoRef} />;
};

export default Pano;
