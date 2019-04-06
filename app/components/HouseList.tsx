import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';

import log from 'loglevel';
import { House } from '../types/GoogleMaps';

interface Props {
  houses: House[];
  selectedId: number;
  onSelectHouse(selectedId: number): void;
}

export default class HouseList extends Component<Props> {
  onItemClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.index) {
      const { houses, onSelectHouse } = this.props;
      const idx = +e.currentTarget.dataset.index;
      const house = houses[idx];
      log.debug('Item clicked');
      log.debug(idx);
      log.debug(house.name);
      onSelectHouse(house.id);
    }
  };

  render() {
    const { houses, selectedId } = this.props;

    return (
      <div>
        <ListGroup>
          {houses.map((h, idx) => (
            <ListGroupItem
              data-index={idx}
              active={h.id === selectedId}
              tag="button"
              action
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
