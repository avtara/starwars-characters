import React, { useEffect, useState } from 'react';
import CharacterList from './CharacterList';
import dummyData from './dummyData';
import endpoint from './endpoint';
import './App.scss';

function App() {
  const useFetch = (url) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      setResponse(null);
      setError(null);

      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setResponse(response);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }, []);

    return [response, loading, error];
  };

  const [response, loading, error] = useFetch(endpoint + '/characters');
  const characters = (response && response.characters) || [];

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
