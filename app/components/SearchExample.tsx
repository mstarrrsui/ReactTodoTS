import * as React from 'react';
import { from, Observable } from 'rxjs';

import { css, cx } from 'emotion';
import log from 'loglevel';
import TypeAhead from './TypeAhead';
import Task from 'app/types/Task';

const SearchExampleClasses = cx('container', 'form-group', 'col-md-8', [
  css`
    margin-top: 40px;
  `
]);

const doSearch = (term: string): Observable<Task[]> => {
  log.debug(` search api call:${term}`);
  const promise = window
    .fetch(`https://www.reddit.com/search.json?q=${term}`)
    .then(response => response.json())
    .then(json => json.data.children);
  return from(promise);
};

const SearchExample: React.SFC = () => (
  <TypeAhead doSearch={doSearch}>
    {({ onSearchTextChanged, results }) => (
      <div className={SearchExampleClasses}>
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

export default SearchExample;
