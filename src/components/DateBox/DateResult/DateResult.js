import React from 'react';
import './DateResult.css';
import langDict from '../../LangDict';

function formatExperience(experience, langDict, lang) {
    if (experience[0] === 0) {
        return `${experience[1]} ${langDict[lang].month}`;
    } else if (experience[1] === 0) {
        return `${experience[0]} ${langDict[lang].year}`;
    } else {
        return `${experience[0]} ${langDict[lang].year} ${experience[1]} ${langDict[lang].month}`;
    }
}

const DateResult = ({ experiences, totalExperience, lang }) => {
    experiences = experiences.map(experience => formatExperience(experience, langDict, lang));
    totalExperience = formatExperience(totalExperience, langDict, lang);

    return (
        <div className="date-result">
            <h2 className="date-result-h2"> {langDict[lang].experiences} </h2>
            <ul className="date-result-ul">
                {experiences.map((experience, index) => (
                    <li key={index}>{experience}</li>
                ))}
            </ul>
            <h2 className="date-result-h2"> {langDict[lang].totalExperience}</h2>
            <p
                id="total-experience"
                data-testid="total-experience">
                {totalExperience}
            </p>
        </div>
    );
}

export default DateResult;
