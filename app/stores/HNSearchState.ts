import { BehaviorSubject, Observable } from 'rxjs';
import log from 'loglevel';

import { HNItem, mapFromJSON } from '../components/hackernews/HNItem';

const SEARCH_URL = 'http://hn.algolia.com/api/v1/search?tags=story&query=';

class HNSearchState {
  public searchResults = new BehaviorSubject<Array<HNItem>>([]);
  public searchTerm = new BehaviorSubject<string>('');
  public isLoading = new BehaviorSubject<boolean>(true);

  private _searchResults: Array<HNItem> = [];
  private _searchTerm: string = '';

  onSearchTermChanged(newterm: string): void {
    this._searchTerm = newterm;
    this.searchTerm.next(this._searchTerm);
  }

  fetchSearchResults(term: string): void {
    this.isLoading.next(true);
    //setError(null);
    fetch(SEARCH_URL + term)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('error...');
          throw Error('Error fetching the data!!!');
        }
      })
      .then((items: { hits: [] }) => {
        this.isLoading.next(false);
        this._searchResults = items.hits.map(mapFromJSON);
        this.searchResults.next(this._searchResults);
      });
    //.catch(error => {
    //  setIsLoading(false);
    //  setError(error);
    //});
  }
}

export const hnSearchState = new HNSearchState();
