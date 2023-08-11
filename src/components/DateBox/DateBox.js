import React, { useState } from 'react';
import './DateBox.css';
import DatePair from './DatePair/DatePair';
import DateResult from './DateResult/DateResult';
import langDict from '../LangDict';

const DateBox = ({ language }) => {
  const [datePairCount, setDatePairCount] = useState(1);
  const [experiences, setExperiences] = useState([]);
  const [totalExperience, setTotalExperience] = useState('');
  const [showDateResult, setShowDateResult] = useState(false);

  const datePairs = Array.from({ length: datePairCount }, (_, index) => (
    <DatePair
      key={index}
      onDelete={() => handleDatePairDelete(index)}
      language={language}
    />
  ));

  const addDatePair = () => {
    setDatePairCount(prevCount => prevCount + 1);
  };

  const handleDatePairDelete = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);

    const updatedTotalExperience = calculateTotalExperience(updatedExperiences);
    setTotalExperience(updatedTotalExperience);
    setExperiences(updatedExperiences);
  };

  const calculateTotal = (datePairs, index) => datePairs.reduce((sum, experience) => {
    const numbers = experience.match(/\d+/g);
    const value = numbers ? parseInt(numbers[index]) : 0;
    return sum + value;
  }, 0);

  const calculateTotalExperience = datePairs => {
    const totalYears = calculateTotal(datePairs, 0);
    const totalMonths = calculateTotal(datePairs, 1);
    const totalYearsWithRemainder = totalYears + Math.floor(totalMonths / 12);
    const totalMonthsWithRemainder = totalMonths % 12;
    return `${totalYearsWithRemainder} year(s) and ${totalMonthsWithRemainder} month(s)`;
  };

  const calculateExperience = event => {
    event.preventDefault();
    const dateForm = document.getElementById('date-form');
    const dateInputs = dateForm.querySelectorAll('input');
    const dateArray = Array.from(dateInputs, dateInput => dateInput.value.replace(/\D/g, ''));

    if (dateArray.some(date => date === '')) {
      alert(langDict[language].emptyDate);
      return;
    }

    const datePairs = dateArray.reduce((pairs, _, index, array) => {
      if (index % 2 === 0 && array[index + 1]) {
        const startDate = array[index];
        const endDate = array[index + 1];

        if (startDate.length !== 6 || endDate.length !== 6) {
          alert(langDict[language].invalidDate);
          return pairs;
        }

        if (startDate >= endDate) {
          alert(langDict[language].endDateBeforeStartDate);
          return pairs;
        }

        const startYear = parseInt(startDate.substring(0, 4), 10);
        const startMonth = parseInt(startDate.substring(4, 6), 10);
        const endYear = parseInt(endDate.substring(0, 4), 10);
        const endMonth = parseInt(endDate.substring(4, 6), 10);

        if (startYear < 1900 || endYear < 1900) {
          alert(langDict[language].checkYears);
          return pairs;
        }

        if (startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
          alert(langDict[language].checkMonths);
          return pairs;
        }

        const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
        const totalYears = Math.floor(totalMonths / 12);
        const totalMonthsRemainder = totalMonths % 12;
        const totalExperience = `${totalYears} year(s) and ${totalMonthsRemainder} month(s)`;

        setShowDateResult(true);
        return [...pairs, totalExperience];
      }
      return pairs;
    }, []);

    const totalExperience = calculateTotalExperience(datePairs);
    setTotalExperience(totalExperience);
    setTotalExperience(totalExperience);
    setExperiences(datePairs);
  };

  return (
    <div>
      <form id="date-form" data-testid="date-form" className="search-form">
        <label className="form-label" htmlFor="start-date">
          {langDict[language].yearsOfExperience}
        </label>
        {datePairs}
        <button
          id="add-pair-button"
          data-testid="add-pair-button"
          className="add-button"
          type="button"
          onClick={addDatePair}
        >
          +
        </button>
        {showDateResult &&
          <DateResult
            language={language}
            experiences={experiences}
            totalExperience={totalExperience}
          />}
        <button
          id="submit-date-button"
          data-testid="submit-date-button"
          className="form-button"
          type="submit"
          onClick={calculateExperience}
        >
          {langDict[language].submit}
        </button>
      </form>
    </div>
  );
};

export default DateBox;
