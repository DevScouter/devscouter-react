import React from 'react';
import './LangChange.css';

const LangChange = ({ onChangeLang }) => {
    return (
        <div className="lang-change">
            <button
                className="lang-button"
                id="en-button"
                data-testid="en-button"
                onClick={() => onChangeLang('en')}>
                English
            </button>
            <button
                className="lang-button"
                id="kr-button"
                data-testid="kr-button"
                onClick={() => onChangeLang('kr')} >
                한국어
            </button>
        </div>
    );
}

export default LangChange;
