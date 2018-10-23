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
    const idx = +e.currentTarget.dataset.index;
    const house = houses[idx];
    log.debug('Item clicked');
    log.debug(idx);
    log.debug(house.name);
    this.props.onSelectHouse(house.location);
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
