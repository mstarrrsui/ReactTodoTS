import * as React from 'react';
import ItemRow from './ItemRow';
import { HNItem } from './HNItem';

interface Props {
  isLoading: boolean;
  error: Error | null;
  items: HNItem[];
}

const HNResultsList: React.SFC<Props> = function({ isLoading, error, items }) {
  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Please wait... loading......</p>;
  }

  return (
    <div>
      {items.map((item, idx) => (
        <ItemRow key={item.objectId} index={idx} item={item} />
      ))}
    </div>
  );
};

export default HNResultsList;
