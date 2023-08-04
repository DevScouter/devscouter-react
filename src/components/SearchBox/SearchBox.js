import React from 'react';
import './SearchBox.css';

const SearchBox = () => {
  return (
    <form id="search-form" className="search-form">
      <label className="form-label" htmlFor="username">
        Username:
      </label>
      <input id="username-input" className="form-input" type="text" name="username" />
      <button id="submit-button" className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default SearchBox;
