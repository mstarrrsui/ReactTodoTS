import * as React from 'react';
import { from, Observable } from 'rxjs';

import styled from '@emotion/styled';
import log from 'loglevel';
import TypeAhead from './TypeAhead';

interface RedditArticleFields {
  id: string;
  url: string;
  title: string;
}

interface RedditData {
  data: RedditArticleFields;
}

const doSearch = (term: string): Observable<RedditData[]> => {
  log.debug(` search api call:${term}`);
  const promise = window
    .fetch(`https://www.reddit.com/search.json?q=${term}`)
    .then(response => response.json())
    .then(json => json.data.children);
  return from(promise);
};

//class RedditTypeAhead extends TypeAhead<RedditData> {}
type Props = {
  className?: string;
};

const SearchExampleBase: React.SFC<Props> = ({ className }) => (
  <TypeAhead doSearch={doSearch}>
    {({ onSearchTextChanged, results }) => (
      <div className={`container form-group col-md-8 ${className}`}>
        <h4>Reddit Search</h4>
        <input
          className="form-control"
          placeholder="Search Term"
          type="text"
          onChange={onSearchTextChanged}
        />
        <ul className="list-group">
          {results.map(res => (
            <li className="list-group-item" key={res.data.id}>
              <a href={res.data.url}>{res.data.title}</a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </TypeAhead>
);

type SearchProps = {
  padTop: string;
};
const SearchExample: React.ComponentType<Props & SearchProps> = styled(SearchExampleBase)<
  SearchProps
>`
  margin-top: ${(props: SearchProps) => props.padTop};
`;
export default SearchExample;
