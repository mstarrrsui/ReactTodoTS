import * as React from 'react';
import HNItem from './HNItem';
import ItemRow from './ItemRow';

const DATA_URL = 'https://hn.algolia.com/api/v1/search_by_date?page=0&tags=story&hitsPerPage=1000';

// interface Props {
//   stack: string;
// }

interface State {
  isLoading: boolean;
  error: Error | null;
  items: Array<HNItem>;
}

const initialState: State = {
  isLoading: false,
  error: null,
  items: []
};
export default class ResultsList extends React.Component<{}, State> {
  public state: State = initialState;

  public loadResults(): void {
    this.setState({ isLoading: true, error: null });
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
        this.setState({ items: items.hits, isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false, error });
      });
  }

  public componentDidMount(): void {
    this.loadResults();
  }

  public render(): React.ReactNode {
    const { items, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Please wait... loading......</p>;
    }

    return (
      <div>
        {items.map((item, idx) => (
          <ItemRow key={item.objectID} index={idx} item={item} />
        ))}
      </div>
    );
  }
}
