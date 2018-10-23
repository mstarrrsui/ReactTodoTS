import React, { Component } from 'react';
import HouseList from './HouseList';
import MapContainer from './MapContainer';

import log from 'loglevel';

export default class LocationFinder extends Component {
  public onHouseSelect = (index: any) => {
    log.debug('On house select:' + index);
  };

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10" style={{ marginTop: '20px' }}>
            <MapContainer />
          </div>
          <div className="col-md-2" style={{ marginTop: '35px' }}>
            <h4>Houses</h4>
            <HouseList onSelectHouse={this.onHouseSelect} />
          </div>
        </div>
      </div>
    );
  }
}
