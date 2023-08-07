import React from 'react';

const DatePair = () => {
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
        </div>
    );
}

export default DatePair;
