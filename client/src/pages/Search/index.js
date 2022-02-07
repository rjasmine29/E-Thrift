import React, { useState, useEffect } from 'react';
import { NavBar, CatBar, Mapbox, SearchBar } from '../../components';
import ProductCard from '../../components/productCard';
import { getSearch } from "../../helpers/requests";


function Search() {
  const [cat, setCat] = useState('all')
  const [result, setResult]=useState(getSearch.result)

  useEffect(() => {

  }, [cat])

  return (
    <div>
        {/* <NavBar /> */}
        {/* <Mapbox /> */}
        <SearchBar />
        <CatBar />
        <h3>Number of results goes here</h3>
        <h2>Search Phrase variable goes here</h2>
        <ProductCard />
    </div>
    );
}

export default Search;