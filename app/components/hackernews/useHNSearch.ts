import { HNItem, mapFromJSON } from './HNItem';
import { useState, useEffect } from 'react';

const DATA_URL = window.appSettings.hnDataUrl;

interface HNSearchResult {
  isLoading: boolean;
  error: Error | null;
  items: Array<HNItem>;
}

const useHNSearch = (): HNSearchResult => {
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

  return { isLoading, error, items };
};

export default useHNSearch;
