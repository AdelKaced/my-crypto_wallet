import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
            <tr key={coin.symbol}>
              <td className="rank">
                <i className="fa-solid fa-star"></i>
                {coin.market_cap_rank}
              </td>

              <td className="name">
                <img src={coin.image} alt={coin.symbol} className="coin-logo" />{' '}
                <Link to={`/currencies/${coin.id}`}>
                  {coin.name} <span className="symbol">{coin.symbol}</span>{' '}
                </Link>
              </td>

              <td> {coin.current_price}</td>
              <td>
                {Math.round(coin.price_change_percentage_24h * 100) / 100}%
              </td>
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
