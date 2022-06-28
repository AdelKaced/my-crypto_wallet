import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchResult from './SearchResult';

const Search = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [input, setInput] = useState('');
  const [displaySearch, setDisplaySearch] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/list?limit=10')
      .then((res) => {
        // Remove all value whick contains number thanks to regex
        const filterResult = res.data.filter((coin) => !/\d/.test(coin.id));
        setCoinsData(filterResult);
      });
  }, []);

  const handleInput = (e) => {
    if (e.target.value) {
      setDisplaySearch(true);
    } else {
      setDisplaySearch(false);
    }
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" placeholder="Search" onChange={handleInput} />
      <div className={displaySearch ? 'search-results display' : 'search-results '}>
        {input &&
          coinsData
            .filter(
              (coin) =>
                coin.id.startsWith(input) || coin.symbol.startsWith(input)
            )
            .map((coin) => (
              <Link key={coin.id} to={`/currencies/${coin.id}`}>
                <SearchResult coin={coin} setDisplaySearch={setDisplaySearch} setInput={setInput} key={coin.id} />{' '}
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Search;
