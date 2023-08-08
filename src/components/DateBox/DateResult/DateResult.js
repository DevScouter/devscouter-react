import React from 'react';

const DateResult = ({ experiences }) => {
    return (
        <div className="date-result">
            <h2> Experiences </h2>
            <ul>
                {experiences.map((experience, index) => (
                    <li key={index}>{experience}</li>
                ))}
            </ul>
        </div>
    );
}

export default DateResult;
