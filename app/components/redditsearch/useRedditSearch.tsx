import { of, Subject, from, Observable } from 'rxjs';
import log from 'loglevel';
import { tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { useState, useEffect } from 'react';
import { RedditData } from './RedditDataInterfaces';

const doSearch = (term: string): Observable<RedditData[]> => {
  log.debug(` search api call:${term}`);
  const promise = window
    .fetch(`https://www.reddit.com/search.json?q=${term}`)
    .then(response => response.json())
    .then(json => json.data.children);
  return from(promise);
};

const useRedditSearch = (): {
  onChange: (term: string) => void;
  searchResults: RedditData[];
} => {
  const [searchTermSubject$] = useState<Subject<string>>(new Subject());
  const [results, setResults] = useState<RedditData[]>([]);

  const onChange = (term: string): void => {
    searchTermSubject$.next(term);
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

  return { onChange, searchResults: results };
};

export default useRedditSearch;
