import React from 'react';
import { NavBar, CatBar, Mapbox } from '../../components';

function Search() {
  return (
    <div>
        <NavBar />
        <Mapbox />
        <CatBar />
        <h3>Number of results goes here</h3>
        <h2>Search Phrase variable goes here</h2>
        <h2>Search card component</h2>
    </div>
    );
}

export default Search;