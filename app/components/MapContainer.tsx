import React, { Component, createRef } from 'react';
import { loadGoogleMapsApi } from '../util/loadGoogleMapsApi';

export class MapContainer extends Component {
  private mapRef = createRef<HTMLDivElement>();

  public componentDidMount() {
    log.debug('MapContainer Mounted');
    TodoRepo.loadTasks().then(tasks => {
      log.debug('Setting todolist state');

      this.setState(() => ({
        isLoading: false,
        todoItems: tasks
      }));
    });
  }

  public render() {
    return <div ref={this.mapRef}>Loading map...</div>;
  }
}

export default GoogleApiWrapper({
  apiKey: 'KEY'
})(MapContainer);
