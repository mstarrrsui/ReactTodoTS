import React, { useState } from 'react';
import log from 'loglevel';
import { houses, getLocationForId } from '../data/houses';
import { Location } from '../types/GoogleMaps';
import HouseList from './HouseList';
import MapContainer from './MapContainer';

interface State {
  location: Location;
  selectedId: number;
}

const initialState: State = {
  location: houses[0].location,
  selectedId: 1
};

const LocationFinder: React.FC = () => {
  const [selected, setSelected] = useState(initialState);

  function onHouseSelect(selectedId: number): void {
    const loc = getLocationForId(selectedId);
    log.debug(`On house select:${loc.position.lat}`);
    setSelected({ location: loc, selectedId });
  }

  log.debug('LocationFinder - render');
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10" style={{ marginTop: '20px' }}>
          <MapContainer location={selected.location} />
        </div>
        <div className="col-md-2" style={{ marginTop: '35px' }}>
          <h4>Houses</h4>
          <HouseList
            houses={houses}
            selectedId={selected.selectedId}
            onSelectHouse={onHouseSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationFinder;
