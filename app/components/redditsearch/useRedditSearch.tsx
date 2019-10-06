import { of, Subject, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import log from 'loglevel';
import {
  tap,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import { useState, useEffect } from 'react';
import { RedditSearchResponse } from './RedditDataInterfaces';

const doSearch = (term: string): Observable<RedditSearchResponse> => {
  log.debug(` search api call:${term}`);
  // const promise = window
  //   .fetch(`https://www.reddit.com/search.json?q=${term}`)
  //   .then(response => response.json())
  //   .then(json => json.data.children);

  const data$ = fromFetch(`https://www.reddit.com/search.json?q=${term}`).pipe(
    switchMap(response => {
      if (response.ok) {
        //log.debug('reddit search OK');
        return response.json();
      } else {
        // Server is returning a status requiring the client to try something else.
        //log.error(`reddit search error`);
        return of({ children: [], errorMessage: `Error ${response.status}` });
      }
    }),
    map(json => {
      //log.debug(`redditsearch.json: ${json.data}`);
      return json.data as RedditSearchResponse;
    }),
    catchError(err => {
      // Network or other error, handle appropriately
      //log.error('redditsearch-catcherror', err);
      return of({ children: [], errorMessage: err.message });
    })
  );
  return data$;
};

const useRedditSearch = (): {
  onChange: (term: string) => void;
  searchResults: RedditSearchResponse;
} => {
  const [searchTermSubject$] = useState<Subject<string>>(new Subject());
  const [results, setResults] = useState<RedditSearchResponse>({ children: [] });

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
        switchMap((term: string) =>
          term ? doSearch(term) : of({ children: [] } as RedditSearchResponse)
        )
      )
      .subscribe(
        d => {
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
      log.debug('redditsearch-useeffect-CLEANUP');
      subscription.unsubscribe();
    }
    return cleanup;
  }, [searchTermSubject$]);

  return { onChange, searchResults: results };
};

export default useRedditSearch;
