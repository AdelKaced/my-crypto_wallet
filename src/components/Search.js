import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchResult from './SearchResult';

const Search = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/list?limit=10')
      .then((res) => {
        // Remove all value whick contains number thanks to regex
        const filterResult = res.data.filter((coin) => !/\d/.test(coin.id));
        setCoinsData(filterResult);
      });
  }, []);

  console.log(input);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={input ? "search-results display" : "search-results "}>
        {input &&
          coinsData
            .filter(
              (coin) =>
                coin.id.startsWith(input) || coin.symbol.startsWith(input)
            )
            .map((coin) => <SearchResult coin={coin} key={coin.id} />)}
      </div>
    </div>
  );
};

export default Search;
