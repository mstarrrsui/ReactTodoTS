import * as React from 'react';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { css, cx } from 'emotion';
import log from 'loglevel';

const SearchExampleClasses = cx('container', 'form-group', 'col-md-8', [
  css`
    margin-top: 40px;
  `
]);

interface ISearchExampleState {
  searchText: string;
  results: any[];
}
const initialState: ISearchExampleState = {
  searchText: '',
  results: []
};

export default class SearchExample extends React.Component<object, ISearchExampleState> {
  public state: Readonly<ISearchExampleState> = initialState;
  private searchSubject: Subject<any> = new Subject();
  private resultsSubscription: Subscription;

  constructor(props: any) {
    super(props);
    this.search = this.search.bind(this);
  }

  public componentDidMount() {
    log.debug('SearchExample mounted');

    this.resultsSubscription = this.getResultsSubscription().subscribe(res => {
      this.setState({ results: res });
    });
  }

  public componentWillUnmount() {
    if (this.resultsSubscription) {
      this.resultsSubscription.unsubscribe();
    }
  }

  public search(event: React.ChangeEvent<HTMLInputElement>) {
    const searchtext = event.target.value.trim();
    log.debug(`searchtext: ${searchtext}`);
    this.setState({ searchText: searchtext });
    this.searchSubject.next(searchtext);
  }

  public doSearch(term: any): Observable<any> {
    log.debug(` search api call:${term}`);
    const promise = fetch(`https://www.reddit.com/search.json?q=${term}`)
      .then(response => response.json())
      .then(json => {
        return json.data.children;
      });

    return from(promise);
  }

  public getResultsSubscription(): Observable<any> {
    return this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => (term ? this.doSearch(term) : of([]))),
      catchError(error => {
        log.error(error);
        return of([]);
      })
    );
  }

  public render() {
    const results = this.state.results.map(res => {
      return (
        <li className="list-group-item" key={res.data.id}>
          <a href={res.data.url}>{res.data.title}</a>
        </li>
      );
    });

    return (
      <div className={SearchExampleClasses}>
        <h4>Search On Reddit</h4>
        <input
          className="form-control"
          placeholder="Search Term"
          type="text"
          onChange={this.search}
        />
        <ul className="list-group">{results}</ul>
      </div>
    );
  }
}
