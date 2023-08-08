import React, { useState } from 'react';

const DatePair = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDateChange = (event, setDate) => {
        const { value } = event.target;
        const numericValue = value.replace(/\D/g, '');

        if (numericValue.length >= 6) {
            const year = numericValue.slice(0, 4);
            const month = numericValue.slice(4, 6);
            setDate(`${year}-${month}`);
        } else {
            setDate(numericValue);
        }
    };

    const deleteDatePair = event => {
        event.preventDefault();
        const datePair = event.target.closest('.date-pair');
        const datePairs = document.querySelectorAll('.date-pair');

        if (datePairs.length > 1) {
            datePair.remove();
        } else {
            alert('You must have at least one date pair.');
        }
    };

    return (
        <div className="date-pair">
            <input
                id="start-date-input"
                data-testid="start-date-input"
                className="form-input"
                type="text"
                name="start-date"
                value={startDate}
                onChange={event => handleDateChange(event, setStartDate)}
                placeholder="YYYY-MM"
            />
            <input
                id="end-date-input"
                data-testid="end-date-input"
                className="form-input"
                type="text"
                name="end-date"
                value={endDate}
                onChange={event => handleDateChange(event, setEndDate)}
                placeholder="YYYY-MM"
            />
            <button
                id="delete-pair-button"
                data-testid="delete-pair-button"
                className="delete-button"
                type="button"
                onClick={deleteDatePair}
            >
                Delete
            </button>
        </div>
    );
}

export default DatePair;
