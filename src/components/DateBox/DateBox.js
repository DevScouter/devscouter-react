import React, { useState } from 'react';
import DatePair from './DatePair/DatePair';
import DateResult from './DateResult/DateResult';

const DateBox = () => {
  const [datePairCount, setDatePairCount] = useState(1);

  const addDatePair = () => {
    setDatePairCount(prevCount => prevCount + 1);
  };

  const datePairs = Array.from({ length: datePairCount }, (_, index) => (
    <DatePair key={index} />
  ));

  return (
    <div>
      <form id="date-form" data-testid="date-form" className="search-form">
        <label className="form-label" htmlFor="start-date">
          Years of Experience: (YYYYMMDD)
        </label>
        {datePairs}
        <button
          id="add-pair-button"
          data-testid="add-pair-button"
          className="add-button"
          type="button"
          onClick={addDatePair}
        >
          Add
        </button>
        <DateResult />
        <button
          id="submit-date-button"
          data-testid="submit-date-button"
          className="form-button"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DateBox;
