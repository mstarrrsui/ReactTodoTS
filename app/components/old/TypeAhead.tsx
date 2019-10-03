import * as React from 'react';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import log from 'loglevel';
import { hasChildren, hasRender } from '../../util/typeUtil';

type Props<T> = { doSearch: (term: string) => Observable<T[]> } & RenderProps<T>;

// this is the shape of the props we pass to our render prop function. The getAPI function
// allows us to put construction in one place and use it describe the type here
type API<T> = {
  results: T[];
  onSearchTextChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// render prop concept can either be a property - usually called render - which is a function, or
// the child - the children prop - is the render function.  This union type supports both
type RenderProps<T> =
  | { children: (props: API<T>) => React.ReactNode }
  | { render: (props: API<T>) => React.ReactNode };

const initialState = {
  results: []
};

type State<T> = { results: T[] };

export default class TypeAhead<T> extends React.Component<Props<T>, State<T>> {
  state: State<T> = initialState;

  private searchSubject: Subject<string> = new Subject();

  constructor(props: Props<T>) {
    super(props);
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
  }

  componentDidMount(): void {
    log.debug('SearchExample mounted');

    this.resultsSubscription = this.getResultsSubscription().subscribe(res => {
      this.setState({ results: res });
    });
  }

  componentWillUnmount(): void {
    if (this.resultsSubscription) {
      this.resultsSubscription.unsubscribe();
    }
  }

  onSearchTextChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    const searchtext = event.target.value.trim();
    this.searchSubject.next(searchtext);
  }

  getResultsSubscription(): Observable<T[]> {
    const { doSearch } = this.props;
    return this.searchSubject.pipe(
      tap(term => log.debug(`redditsearch-changed:${term}`)),
      debounceTime(500),
      distinctUntilChanged(),
      tap(term => log.debug(`redditsearch-DEBOUNCED:${term}`)),
      switchMap(term => (term ? doSearch(term) : of([]))),
      catchError(error => {
        log.error(error);
        return of([]);
      })
    );
  }

  private getApi(): API<T> {
    const { results } = this.state;
    return {
      results,
      onSearchTextChanged: this.onSearchTextChanged
    };
  }

  private resultsSubscription: Subscription | undefined;

  render(): React.ReactNode {
    if (hasRender(this.props)) {
      const { render } = this.props;
      return render(this.getApi());
    }

    if (hasChildren(this.props)) {
      const { children } = this.props;
      return children(this.getApi());
    }

    return <div />;
  }
}
