import './App.css';
import DateBox from './DateBox/DateBox';
import SearchBox from './SearchBox/SearchBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        DevScouter - GitHub User Search
      </header>
      <DateBox />
      <SearchBox />
    </div>
  );
}

export default App;
