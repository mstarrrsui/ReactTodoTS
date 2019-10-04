import * as React from 'react';
import log from 'loglevel';
import useRedditSearch from './useRedditSearch';

const SearchExample: React.SFC = () => {
  const { onChange, searchResults } = useRedditSearch();

  const handleSearchTermChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    log.debug(`handleSearchTermChange: ${value}`);
    onChange(value);
  };

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
        {searchResults.map(res => (
          <li className="list-group-item" key={res.data.id}>
            <a href={res.data.url}>{res.data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchExample;
