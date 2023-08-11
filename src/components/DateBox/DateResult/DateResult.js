import React from 'react';
import './DateResult.css';
import langDict from '../../LangDict';

const DateResult = ({ experiences, totalExperience, language }) => {
    return (
        <div className="date-result">
            <h2 className="date-result-h2"> {langDict[language].experiences} </h2>
            <ul className="date-result-ul">
                {experiences.map((experience, index) => (
                    <li key={index}>{experience}</li>
                ))}
            </ul>
            <h2 className="date-result-h2"> {langDict[language].totalExperience}</h2>
            <p
                id="total-experience"
                data-testid="total-experience">
                {totalExperience}
            </p>
        </div>
    );
}

export default DateResult;
