import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
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
            <th>Last 7days</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.symbol}>
              <td className="rank">
                <i className="fa-solid fa-star"></i>
                {coin.market_cap_rank}
              </td>
              <td className="name">
                <img src={coin.image} alt={coin.symbol} className="coin-logo" />{' '}
                {coin.name} <span className="symbol">{coin.symbol}</span>
              </td>
              <td> {coin.current_price}</td>
              <td>
                {Math.round(coin.price_change_percentage_24h * 100) / 100}%
              </td>
              <td>{coin.market_cap}</td>
              <td>{coin.ath}</td>
              <td>{athVariation(coin)}%</td>
              <td>
                <Sparklines data={coin.sparkline_in_7d.price}>
                  <SparklinesLine color="#06FF8A"  style={{ fill: "none"}} />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
