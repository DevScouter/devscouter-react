import './App.css';
import { useState } from 'react';
import DateBox from './DateBox/DateBox';
import LangChange from './LangChange/LangChange';
import langDict from './LangDict';
import SearchBox from './SearchBox/SearchBox';

function App() {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="App">
      <header className="App-header">
        {langDict[language].headerText}
      </header>
      <LangChange onChangeLanguage={changeLanguage} />
      <DateBox language={language} />
      <SearchBox language={language} />
    </div>
  );
}

export default App;
