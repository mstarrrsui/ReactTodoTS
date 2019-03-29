import React, { Component } from 'react';
import { House, Location } from '../types/GoogleMaps';

import { ListGroup, ListGroupItem } from 'reactstrap';

import log from 'loglevel';

interface Props {
  houses: House[];
  selectedId: number;
  onSelectHouse(selectedId: number): void;
}

export default class HouseList extends Component<Props> {
  onItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const idx = +e.currentTarget.dataset.index!;
    const house = this.props.houses[idx];
    log.debug('Item clicked');
    log.debug(idx);
    log.debug(house.name);
    this.props.onSelectHouse(house.id);
  };

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.houses.map((h, idx) => (
            <ListGroupItem
              data-index={idx}
              active={h.id === this.props.selectedId}
              tag="button"
              action={true}
              onClick={this.onItemClick}
            >
              {h.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
