import * as React from 'react';
import log from 'loglevel';
import { useState } from 'react';

interface Props {
  setSearchTerm: (term: string) => void;
}
const HNSearchForm: React.SFC<Props> = function({ setSearchTerm }) {
  const [searchTermValue, setSearchTermValue] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    log.debug(`handleChange: ${value}`);
    setSearchTermValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    log.debug('handleSubmit');
    event.preventDefault();
    setSearchTerm(searchTermValue);
  };

  return (
    <form className="form-inline form-row" onSubmit={handleSubmit}>
      <div className="col-md-7 offset-md-2">
        <input
          type="text"
          id="hnSearchTerm"
          className="form-control w-100"
          placeholder="Search Hacker News..."
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <button type="submit" className="btn-sm btn-primary m-2">
          Search
        </button>
      </div>
    </form>
  );
};

export default HNSearchForm;
