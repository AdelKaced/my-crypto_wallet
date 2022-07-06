import React from 'react';

const SearchResult = ({ coin, setInput }) => {


  return (
    <div
      className="search-result"
      onClick={() => {
        console.log('test');
        // setInput('');
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
