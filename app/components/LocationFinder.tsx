import React, { Component } from 'react';
import { houses } from '../data/houses';
import { Location, House } from '../types/GoogleMaps';
import HouseList from './HouseList';
import MapContainer from './MapContainer';

import log from 'loglevel';

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
    const loc = this.getLocationForId(selectedId);
    log.debug('On house select:' + loc.position.lat);
    this.setState(() => ({
      location: loc,
      selectedId
    }));
  };

  private getLocationForId(id: number): Location {
    const found = houses.find(h => h.id === id) as House;
    return found.location;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10" style={{ marginTop: '20px' }}>
            <MapContainer location={this.state.location} />
          </div>
          <div className="col-md-2" style={{ marginTop: '35px' }}>
            <h4>Houses</h4>
            <HouseList
              houses={houses}
              selectedId={this.state.selectedId}
              onSelectHouse={this.onHouseSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}
