import * as React from 'react';
import ItemRow from './ItemRow';
import useHNSearch from './useHNSearch';

const ResultsList: React.SFC = function() {
  const { isLoading, error, items } = useHNSearch();

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

export default ResultsList;
