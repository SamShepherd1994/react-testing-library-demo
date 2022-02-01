import React from 'react';
import './App.css';
import { SearchBar } from './Components/SearchBar';
import { SearchContext } from './Contexts/DefaultSearchContext';

function App() {
  const handleSearch = (search: string) => {
    console.log(search);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <SearchContext.Provider
          value={{
            defaultValue: 'hello',
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </SearchContext.Provider>
      </header>
    </div>
  );
}

export default App;
