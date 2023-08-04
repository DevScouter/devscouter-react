import './App.css';
import SearchBox from './SearchBox/SearchBox';
import ResultBox from './ResultBox/ResultBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        DevScouter - GitHub User Search
      </header>
      <SearchBox />
      <ResultBox />
    </div>
  );
}

export default App;
