import * as React from 'react';
import { from, Observable, of, BehaviorSubject, Subscription, Subject } from 'rxjs';

import styled from '@emotion/styled';
import log from 'loglevel';
import { useEventCallback } from 'rxjs-hooks';
import { tap, mapTo, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { useState, useEffect } from 'react';

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

const SearchExampleBase: React.SFC<Props> = () => {
  //const [searchTerms, setSearchTerms] = useState(new BehaviorSubject<string>(''));
  const [searchTermSubject$, setSearchTermSubject$] = useState<Subject<string>>(new Subject());
  const [results, setResults] = useState<RedditData[]>([]);

  const handleSearchTermChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    log.debug(`handleSearchTermChange: ${value}`);
    searchTermSubject$.next(value);
  };

  useEffect(() => {
    log.debug('useEffect');

    const subscription = searchTermSubject$
      .pipe(
        tap(data => log.debug(`redditsearch: ${data}`)),
        debounceTime(500),
        distinctUntilChanged(),
        tap(term => log.debug(`redditsearch-DEBOUNCED:${term}`)),
        switchMap((term: string) => (term ? doSearch(term) : of([])))
      )
      .subscribe(
        d => {
          log.debug('setresults!');
          setResults(d);
        },
        error => {
          log.error(error);
        },
        () => {
          log.debug('DONE!');
        }
      );

    function cleanup(): void {
      log.debug('CLEANUP');
      subscription.unsubscribe();
    }
    return cleanup;
  }, [searchTermSubject$]);

  return (
    <div className={`container form-group col-md-8`}>
      <h4>Reddit Search</h4>
      <input
        className="form-control"
        placeholder="Search Term"
        type="text"
        onChange={handleSearchTermChange}
      />
      <ul className="list-group">
        {results.map(res => (
          <li className="list-group-item" key={res.data.id}>
            <a href={res.data.url}>{res.data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

type SearchProps = {
  padTop: string;
};
const SearchExample: React.ComponentType<Props & SearchProps> = styled(SearchExampleBase)<
  SearchProps
>`
  margin-top: ${(props: SearchProps) => props.padTop};
`;
export default SearchExample;
