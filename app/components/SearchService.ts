import log from 'loglevel';
import { from, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

declare global {
    interface Window { ctx: any; } // tslint:disable-line
}

export default class SearchService {

  private searchTerm: Subject<any>;

  constructor() {
    this.searchTerm = new Subject<any>();
  }

  public search(term: any) {
    log.debug(`svc.search:${term}`);
    this.searchTerm.next(term);
  }

  public doSearch(term: any): Observable<any> {
    log.debug(`doSearch:${term}`);
    const promise = fetch(`https://www.reddit.com/search.json?q=${term}`)
                  .then(response => response.json())
                  .then(json => {
                      return json.data.children;
                  });

    return from(promise);
  }

  public getResultSubscription(): Observable<any> {
    return this.searchTerm.pipe(
               debounceTime(500),
               distinctUntilChanged(),
               switchMap(term => term ? this.doSearch(term) : of([])),
               catchError(error => {
                 log.error(error);
                 return of([]);
               })
            );
  }
}
