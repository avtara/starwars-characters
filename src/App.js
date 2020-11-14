import React, { useState } from 'react';
import CharacterList from './CharacterList';
import dummyData from './dummyData';
import './App.scss';

function App() {
  const [characters, setCharacters] = useState(dummyData);

  return (
    <div className="App">
      <header>
        <h1>Star Wars Character</h1>
      </header>
      <main>
        <section className="sidebar">
          <CharacterList characters={characters} />
        </section>
      </main>
    </div>
  );
}

export default App;
