import * as React from 'react';
import log from 'loglevel';

import HNSearchForm from './HNSearchForm';
import { useState, useEffect } from 'react';
import { HNItem, mapFromJSON } from './HNItem';
import HNResultsList from './HNResultsList';

const DATA_URL = 'https://hn.algolia.com/api/v1/search_by_date?page=0&tags=story&hitsPerPage=1000';
const SEARCH_URL = 'http://hn.algolia.com/api/v1/search?tags=story&query=';

const HNSearch: React.SFC = function() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<Array<HNItem>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(SEARCH_URL + searchTerm)
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
  }, [searchTerm]);

  return (
    <div>
      <HNSearchForm setSearchTerm={setSearchTerm} />
      <HNResultsList error={error} isLoading={isLoading} items={items} />
    </div>
  );
};

export default HNSearch;
