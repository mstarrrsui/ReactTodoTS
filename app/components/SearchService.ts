import { Observable, of, from } from 'rxjs';
import { Subject } from 'rxjs';
import log from 'loglevel';
 
 
import { map, filter, catchError, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

declare global {
    interface Window { ctx: any; }
}

export default class SearchService {

  private searchTerm: Subject<any>; 

  constructor() {
    this.searchTerm = new Subject<any>();
  }

 


  search(term:any) {
    log.debug(`svc.search:${term}`)
    this.searchTerm.next(term);
  }

  doSearch(term:any) {
    log.debug(`doSearch:${term}`)
    let promise = fetch(`https://www.reddit.com/search.json?q=${term}`)
                  .then(response => response.json())
                  .then(json => {
                      return json.data.children
                  });

    return from(promise)
  }

  getResults() {
    return this.searchTerm.pipe(
               debounceTime(500),
               distinctUntilChanged(),
               switchMap(term => term
                 ? this.doSearch(term) : of([])),
               catchError(error => {
                 console.error(error);
                 return of([]);
               })
            );
  }
}