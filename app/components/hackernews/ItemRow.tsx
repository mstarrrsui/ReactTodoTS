import * as React from 'react';

import HNItem from './HNItem';

interface Props {
  item: HNItem;
  index: number;
}
// a change
const ItemRow: React.SFC<Props> = function({ item, index }) {
  return (
    <div className="hnresultrow">
      {index} -<span className="hnauthor">[{item.author}]</span>-{' '}
      <span className="hntitle">
        <a className="hntitle" target="_blank" rel="noopener noreferrer" href={item.url}>
          {item.title}
        </a>
      </span>
      - {item.created_at}
    </div>
  );
};

export default ItemRow;
