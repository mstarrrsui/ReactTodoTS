import React, { Component } from 'react';
import { houses } from '../data/houses';
import { Location } from '../types/GoogleMaps';
import HouseList from './HouseList';
import MapContainer from './MapContainer';
import { RouteComponentProps } from '@reach/router';

import log from 'loglevel';

interface State {
  location: Location;
}

const initialState: State = {
  location: houses[0].location
};

export default class LocationFinder extends Component<RouteComponentProps> {
  public state: State = initialState;

  public onHouseSelect = (loc: Location) => {
    log.debug('On house select:' + loc.position.lat);
    this.setState(() => ({
      location: loc
    }));
  };

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10" style={{ marginTop: '20px' }}>
            <MapContainer location={this.state.location} />
          </div>
          <div className="col-md-2" style={{ marginTop: '35px' }}>
            <h4>Houses</h4>
            <HouseList houses={houses} onSelectHouse={this.onHouseSelect} />
          </div>
        </div>
      </div>
    );
  }
}
