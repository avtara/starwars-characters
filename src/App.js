import React, { useEffect, useState } from 'react';
import CharacterList from './CharacterList';
import dummyData from './dummyData';
import endpoint from './endpoint';
import './App.scss';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setCharacters([]);
    setError(null);

    fetch(endpoint + '/characters')
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setCharacters(response.characters);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Star Wars Character</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading ..</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
