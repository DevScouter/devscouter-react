import React from 'react';
import './LangChange.css';

const LangChange = ({ onChangeLanguage }) => {
    return (
        <div className="lang-change">
            <button
                className="lang-button"
                id="en-button"
                data-testid="en-button"
                onClick={() => onChangeLanguage('en')}>
                English
            </button>
            <button
                className="lang-button"
                id="kr-button"
                data-testid="kr-button"
                onClick={() => onChangeLanguage('kr')} >
                한국어
            </button>
        </div>
    );
}

export default LangChange;
