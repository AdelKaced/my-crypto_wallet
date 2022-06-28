import React from 'react';

const SearchResult = ({ coin, setDisplaySearch, setInput }) => {
  return (
    <div
      className="search-result"
      onClick={() => {
        setInput('');
        setDisplaySearch(false);
      }}
    >
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
