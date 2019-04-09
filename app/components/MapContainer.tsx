import React, { useRef, useEffect } from 'react';

import log from 'loglevel';
import loadGoogleMapsApi from '../util/loadGoogleMapsApi';
import { Location } from '../types/GoogleMaps';

const mapStyle: React.CSSProperties = {
  height: '40vh',
  width: '100%',
  marginBottom: '20px'
};

const panoStyle: React.CSSProperties = {
  height: '40vh',
  width: '100%'
};

interface Props {
  location: Location;
}

const MapContainer: React.FC<Props> = ({ location }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);
  let map: google.maps.Map | undefined;
  let googleApi: any;

  useEffect(() => {
    function setStreetView(pano: any): void {
      log.debug(`setting street view.. ${pano}   map:${map}`);
      if (map) map.setStreetView(pano);
    }

    function createMap(api): google.maps.Map | undefined {
      try {
        log.debug(`creating map... mapref:${mapRef}`);
        const m = mapRef.current;
        map = new api.Map(m, {
          center: location.position,
          zoom: 16
        });
        return map;
      } catch (e) {
        log.error('Error occurred creating map');
        log.error(e);
        return undefined;
      }
    }

    function createPano(api) {
      log.debug('MapContainer - create Pano');
      try {
        const panoDiv = panoRef.current;
        const panorama = new api.StreetViewPanorama(panoDiv, {
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

    if (!map && mapRef) {
      loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_API_KEY }).then(
        (api): void => {
          log.debug('MapContainer: Maps API loaded');
          googleApi = api;
          map = createMap(googleApi);
          createPano(googleApi);
        }
      );
    } else {
      log.debug(`map.panTo...`);
      this.map.panTo({ lat: location.position.lat, lng: location.position.lng });
      createPano(googleApi);
    }
  }, [location]);

  return (
    <div>
      <div style={mapStyle} ref={mapRef} />
      <div style={panoStyle} ref={panoRef} />
    </div>
  );
};

export default MapContainer;
