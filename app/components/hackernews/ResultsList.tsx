import * as React from 'react';
import { HNItem, mapFromJSON } from './HNItem';
import ItemRow from './ItemRow';
import { useState, useEffect } from 'react';

const DATA_URL = 'https://hn.algolia.com/api/v1/search_by_date?page=0&tags=story&hitsPerPage=1000';

const ResultsList: React.SFC = function() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<Array<HNItem>>([]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(DATA_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('error...');
          throw Error('Error fetching the data!!!');
        }
      })
      .then((items: { hits: [] }) => {
        setIsLoading(false);
        setItems(items.hits.map(mapFromJSON));
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

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
