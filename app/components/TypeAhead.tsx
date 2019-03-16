import * as React from 'react';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import log from 'loglevel';

interface IProps {
  doSearch: (term: string) => Observable<any> | null;
  children: (props: ChildProps) => React.ReactNode;
}

interface IState {
  searchText: string;
  results: any[];
}

type ChildProps = IState & {
  onSearchTextChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const initialState: IState = {
  searchText: '',
  results: []
};

export default class TypeAhead extends React.Component<IProps, IState> {
  public state: Readonly<IState> = initialState;
  private searchSubject: Subject<any> = new Subject();
  private resultsSubscription: Subscription | undefined;

  constructor(props: IProps) {
    super(props);
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
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

  public onSearchTextChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const searchtext = event.target.value.trim();
    log.debug(`searchtext: ${searchtext}`);
    this.setState({ searchText: searchtext });
    this.searchSubject.next(searchtext);
  }

  public doSearch(term: string): Observable<any> {
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
    const { children } = this.props;

    if (!(children instanceof Function)) {
      throw new Error('TypeAhead children needs to be a function.');
    }

    return (
      <div>
        {this.props.children({
          ...this.state,
          onSearchTextChanged: this.onSearchTextChanged
        })}
      </div>
    );
  }
}
