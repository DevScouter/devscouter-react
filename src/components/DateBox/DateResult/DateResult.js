import React from 'react';
import './DateResult.css';

const DateResult = ({ experiences, totalExperience }) => {
    return (
        <div className="date-result">
            <h2 className="date-result-h2"> Experiences </h2>
            <ul className="date-result-ul">
                {experiences.map((experience, index) => (
                    <li key={index}>{experience}</li>
                ))}
            </ul>
            <h2 className="date-result-h2"> Total Experience</h2>
            <p
                id="total-experience"
                data-testid="total-experience">
                {totalExperience}
            </p>
        </div>
    );
}

export default DateResult;
