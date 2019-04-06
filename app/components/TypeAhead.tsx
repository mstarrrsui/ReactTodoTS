import * as React from 'react';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import log from 'loglevel';
import { hasChildren, hasRender } from '../util/typeUtil';

type Props = { doSearch: (term: string) => Observable<any> } & RenderProps;

// this is the shape of the props we pass to our render prop function. The getAPI function
// allows us to put construction in one place and use it describe the type here
type API = ReturnType<TypeAhead['getApi']>;

// render prop concept can either be a property - usually called render - which is a function, or
// the child - the children prop - is the render function.  This union type supports both
type RenderProps =
  | { children: (props: API) => React.ReactNode }
  | { render: (props: API) => React.ReactNode };

const initialState = {
  results: [] as any[]
};

type State = Readonly<typeof initialState>;

export default class TypeAhead extends React.Component<Props, State> {
  state: State = initialState;

  private searchSubject: Subject<any> = new Subject();

  constructor(props: Props) {
    super(props);
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
  }

  componentDidMount() {
    log.debug('SearchExample mounted');

    this.resultsSubscription = this.getResultsSubscription().subscribe(res => {
      this.setState({ results: res });
    });
  }

  componentWillUnmount() {
    if (this.resultsSubscription) {
      this.resultsSubscription.unsubscribe();
    }
  }

  onSearchTextChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const searchtext = event.target.value.trim();
    this.searchSubject.next(searchtext);
  }

  getResultsSubscription(): Observable<any> {
    const { doSearch } = this.props;
    return this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => (term ? doSearch(term) : of([]))),
      catchError(error => {
        log.error(error);
        return of([]);
      })
    );
  }

  private getApi() {
    const { results } = this.state;
    return {
      results,
      onSearchTextChanged: this.onSearchTextChanged
    };
  }

  private resultsSubscription: Subscription | undefined;

  render() {
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
