import React from 'react';
import DatePair from './DatePair/DatePair';
import DateResult from './DateResult/DateResult';

const DateBox = () => {
  return (
    <div>
      <form
        id="date-form"
        data-testid="date-form"
        className="search-form">
        <label
          className="form-label"
          htmlFor="start-date">
          Years of Experience:
        </label>
        <DatePair />
        <button
          id="add-pair-button"
          data-testid="add-pair-button"
          className="add-button"
          type="button">
          Add
        </button>
        <DateResult />
        <button
          id="submit-date-button"
          data-testid="submit-date-button"
          className="form-button"
          type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DateBox;
