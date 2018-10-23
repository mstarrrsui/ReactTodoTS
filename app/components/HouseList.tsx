import React, { Component, createRef } from 'react';
import { Location } from '../types/GoogleMaps';

import { ListGroup, ListGroupItem } from 'reactstrap';

import log from 'loglevel';

import { houses } from '../data/houses';

interface Props {
  onSelectHouse(loc: Location): void;
}

export default class HouseList extends Component<Props> {
  public onItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const { index } = e.currentTarget.dataset;
    const house = houses[index];
    log.debug('Item clicked');
    log.debug(index);
    log.debug(house.name);
  };

  public render() {
    return (
      <div>
        <ListGroup>
          {houses.map((h, idx) => (
            <ListGroupItem data-index={idx} tag="button" action={true} onClick={this.onItemClick}>
              {h.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
