import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

export default class Home extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h1>Welcome to the React Starter</h1>
        <div className="mainimgcontainer">
          <img
            className="mainimg"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png"
          />
        </div>
      </div>
    );
  }
}
