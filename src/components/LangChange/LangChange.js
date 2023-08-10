import React from 'react';

const LangChange = ({ onChangeLanguage }) => {
    return (
        <div className="lang-change">
            <button className="lang-button" onClick={() => onChangeLanguage('en')}>EN</button>
            <button className="lang-button" onClick={() => onChangeLanguage('kr')}>KR</button>
        </div>
    );
}

export default LangChange;
