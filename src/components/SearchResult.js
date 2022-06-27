import axios from 'axios';
import React from 'react';

const SearchResult = ({ coin }) => {
  const getCoinData = (e) => {
    console.log(e.target.id);
    const id = e.target.id;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`
      )
      .then((res) => console.log(res.data));
  };
  return (
    <div className="search-result" onClick={getCoinData}>
      <span className="id" id={coin.id}>
        {coin.id}
      </span>
      <span className="symbol" id={coin.id}>
        {coin.symbol}
      </span>
    </div>
  );
};

export default SearchResult;
