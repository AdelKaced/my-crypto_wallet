import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CoinsContext } from '../App';

const CoinList = () => {
  const coins = useContext(CoinsContext).coins;

  const athVariation = (coin) => {
    let variation = ((coin.ath - coin.current_price) / coin.ath) * 100;
    variation = Math.round(variation * 100) / 100;
    return variation;
  };

  return (
    <div className="coinList">
      <table>
        <thead>
          <tr>
            <th className="rank">#</th>
            <th className="name">Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>MarketCap</th>
            <th>ATH</th>
            <th>Percent ATH</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr>
              <td className="rank">
                <i class="fa-solid fa-star"></i>
                {coin.market_cap_rank}
              </td>
              <td className="name">
                <img src={coin.image} alt={coin.symbol} className="coin-logo" />{' '}
                {coin.name} <span className="symbol">{coin.symbol}</span>
              </td>
              <td> {coin.current_price}</td>
              <td>{coin.price_change_percentage_24h}%</td>
              <td>{coin.market_cap}</td>
              <td>{coin.ath}</td>
              <td>{athVariation(coin)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
