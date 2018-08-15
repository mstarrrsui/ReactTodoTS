import * as React from "react";
import log from 'loglevel';
import SearchService from './SearchService'


interface ISearchExampleState {
  results: any[];
}
const initialState: ISearchExampleState = {
  results: []
};

export default class IApp extends React.Component<object, ISearchExampleState> {
    
    state: Readonly<ISearchExampleState> = initialState;
    searchService: SearchService;

    constructor(props: any) {
        super(props);
        this.searchService = new SearchService();
    }

    componentDidMount() {
        log.debug(`SearchExample mounted`);

        this.searchService
            .getResultSubscription()
            .subscribe(res => {
              this.setState({results: res});
            });
      }

    search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchtext = event.target.value.trim();
        log.debug(`searching with ${searchtext}`);
        this.searchService.search(searchtext);
    } 

    render() {

        let results = this.state.results.map(res => {
            return (
                <li className="list-group-item" key={res.data.id}>
                <a href={res.data.url}>{res.data.title}</a>
                </li>
            );
        });

        return (
            <div className="form-group">
                <h4>Search On Reddit</h4>
                <input className="form-control" placeholder="Search Term" type="text" onChange={this.search} />
                <ul className="list-group">
                {results}
                </ul>
            </div>    
        );
  }
}
