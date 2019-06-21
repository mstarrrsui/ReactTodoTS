import React from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';

import log from 'loglevel';
import { House } from '../types/GoogleMaps';

interface Props {
  houses: House[];
  selectedId: number;
  onSelectHouse(selectedId: number): void;
}

const HouseList: React.FC<Props> = ({ houses, selectedId, onSelectHouse }: Props) => {
  function onItemClick(e: React.MouseEvent<HTMLElement>): void {
    if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.index) {
      const idx = +e.currentTarget.dataset.index;
      const house = houses[idx];
      log.debug('Item clicked');
      log.debug(idx);
      log.debug(house.name);
      onSelectHouse(house.id);
    }
  }

  return (
    <div>
      <ListGroup>
        {houses.map((h, idx) => (
          <ListGroupItem
            data-index={idx}
            active={h.id === selectedId}
            tag="button"
            action
            onClick={onItemClick}
          >
            {h.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default HouseList;
