import React, { Component, createRef } from 'react';
import { Location } from '../types/GoogleMaps';

import { ListGroup, ListGroupItem } from 'reactstrap';

import log from 'loglevel';

interface Props {
  onSelectHouse(loc: Location): void;
}

export default class HouseList extends Component<Props> {
  public onItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const { param } = e.currentTarget.dataset;
    log.debug('Item clicked');
    log.debug(e);
    log.debug(param);
  };

  public render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem data-param="item1" active tag="button" action onClick={this.onItemClick}>
            Mike
          </ListGroupItem>
          <ListGroupItem tag="button" action onClick={this.onItemClick}>
            Trey
          </ListGroupItem>
          <ListGroupItem tag="button" action>
            Robin
          </ListGroupItem>
          <ListGroupItem tag="button" action>
            Matt
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}
