import React, { useEffect, useReducer, useState } from 'react';
import CharacterList from './CharacterList';
import dummyData from './dummyData';
import endpoint from './endpoint';
import './App.scss';

const initialState = {
  result: 'null',
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      result: 'null',
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.response,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};

function App() {
  const useFetch = (url) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
      dispatch({ type: 'LOADING' });

      const fetchUrl = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          dispatch({ type: 'RESPONSE_COMPLETE', payload: { response: data } });
        } catch (error) {
          dispatch({ type: 'ERROR', payload: { error } });
        }
      };

      fetchUrl();

      // fetch(url)
      //   .then((response) => response.json())
      //   .then((response) => {
      //     setLoading(false);
      //     setResponse(response);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     setError(err);
      //   });
    }, []);

    return [state.result, state.loading, state.error];
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
