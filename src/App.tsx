import React from 'react';
import { LocationList } from './LocationList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>List of Locations</h1>
      </header>
      <main>
        <LocationList />
      </main>
    </div>
  );
}

export default App;
