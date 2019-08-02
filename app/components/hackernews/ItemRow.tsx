import * as React from 'react';

import HNItem from './HNItem';

interface Props {
  item: HNItem;
  index: number;
}

const ItemRow: React.SFC<Props> = function({ item, index }) {
  return (
    <div className="hnresultrow">
      {index} -<span className="hnauthor">[{item.author}]</span>-{' '}
      <span className="hntitle">{item.title}</span>- {item.created_at}
    </div>
  );
};

export default ItemRow;
