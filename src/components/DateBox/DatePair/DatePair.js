import React from 'react';

const DatePair = () => {
    const deleteDatePair = event => {
        event.preventDefault();
        const datePair = event.target.closest('.date-pair');
        datePair.remove();
    };

    return (
        <div className="date-pair">
            <input
                id="start-date-input"
                data-testid="start-date-input"
                className="form-input"
                type="text"
                name="start-date"
                placeholder="Start Date"
            />
            <input
                id="end-date-input"
                data-testid="end-date-input"
                className="form-input"
                type="text"
                name="end-date"
                placeholder="End Date"
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
