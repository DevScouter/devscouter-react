import React, { useState } from 'react';
import DatePair from './DatePair/DatePair';
import DateResult from './DateResult/DateResult';

const DateBox = () => {
  const [datePairCount, setDatePairCount] = useState(1);
  const [experiences, setExperiences] = useState([]);

  const addDatePair = () => {
    setDatePairCount(prevCount => prevCount + 1);
  };

  const datePairs = Array.from({ length: datePairCount }, (_, index) => (
    <DatePair key={index} />
  ));

  const calculateExperience = event => {
    event.preventDefault();
    const dateForm = document.getElementById('date-form');
    const dateInputs = dateForm.querySelectorAll('input');
    const dateArray = Array.from(dateInputs, dateInput => dateInput.value);

    const datePairs = dateArray.reduce((pairs, _, index, array) => {
      if (index % 2 === 0 && array[index + 1]) {
        const startDate = array[index];
        const endDate = array[index + 1];

        const startYear = parseInt(startDate.substring(0, 4), 10);
        const startMonth = parseInt(startDate.substring(4, 6), 10);
        const endYear = parseInt(endDate.substring(0, 4), 10);
        const endMonth = parseInt(endDate.substring(4, 6), 10);

        const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
        const totalYears = Math.floor(totalMonths / 12);
        const totalMonthsRemainder = totalMonths % 12;
        const totalExperience = `${totalYears} years and ${totalMonthsRemainder} months`;

        return [...pairs, totalExperience];
      }
      return pairs;
    }, []);

    setExperiences(datePairs);
  };


  return (
    <div>
      <form id="date-form" data-testid="date-form" className="search-form">
        <label className="form-label" htmlFor="start-date">
          Years of Experience: (YYYYMM)
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
        <DateResult experiences={experiences} />
        <button
          id="submit-date-button"
          data-testid="submit-date-button"
          className="form-button"
          type="submit"
          onClick={calculateExperience}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DateBox;
