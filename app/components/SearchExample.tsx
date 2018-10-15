import * as React from 'react';
import { Subscription } from 'rxjs';
import SearchService from './SearchService';

import { css, cx } from 'emotion';
import log from 'loglevel';

const SearchExampleClasses = cx('container', 'form-group', 'col-md-8', [
  css`
    margin-top: 40px;
  `
]);

interface ISearchExampleState {
  results: any[];
}
const initialState: ISearchExampleState = {
  results: []
};

export default class SearchExample extends React.Component<object, ISearchExampleState> {
  public state: Readonly<ISearchExampleState> = initialState;
  private searchService: SearchService;
  private searchSubscription: Subscription;

  constructor(props: any) {
    super(props);
    this.searchService = new SearchService();
  }

  public componentDidMount() {
    log.debug('SearchExample mounted');

    this.searchSubscription = this.searchService.getResultSubscription().subscribe(res => {
      this.setState({ results: res });
    });
  }

  public componentWillUnmount() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  public search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchtext = event.target.value.trim();
    log.debug(`searching with ${searchtext}`);
    this.searchService.search(searchtext);
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
        <input className="form-control" placeholder="Search Term" type="text" onChange={this.search} />
        <ul className="list-group">{results}</ul>
      </div>
    );
  }
}
