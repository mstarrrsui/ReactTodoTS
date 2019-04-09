import React, { Component } from 'react';
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

export default class LocationFinder extends Component {
  state: State = initialState;

  onHouseSelect = (selectedId: number) => {
    const loc = getLocationForId(selectedId);
    log.debug(`On house select:${loc.position.lat}`);
    this.setState(() => ({
      location: loc,
      selectedId
    }));
  };

  render() {
    const { location, selectedId } = this.state;
    log.debug('LocationFinder - render');
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10" style={{ marginTop: '20px' }}>
            <MapContainer location={location} />
          </div>
          <div className="col-md-2" style={{ marginTop: '35px' }}>
            <h4>Houses</h4>
            <HouseList houses={houses} selectedId={selectedId} onSelectHouse={this.onHouseSelect} />
          </div>
        </div>
      </div>
    );
  }
}
