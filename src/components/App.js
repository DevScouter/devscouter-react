import './App.css';
import { useState } from 'react';
import DateBox from './DateBox/DateBox';
import LangChange from './LangChange/LangChange';
import langDict from './LangDict';
import SearchBox from './SearchBox/SearchBox';

function App() {
  const [lang, setLang] = useState('en');

  const changeLang = (lang) => {
    setLang(lang);
  };

  return (
    <div className="App" data-testid="app">
      <LangChange onChangeLang={changeLang} />
      <header
        className="App-header"
        data-testid="App-header"
      >
        {langDict[lang].headerText}
      </header>
      <div className="App-subheader">
        {langDict[lang].subText}
      </div>
      <DateBox lang={lang} />
      <SearchBox lang={lang} />
    </div>
  );
}

export default App;
