import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatMarketCap, formatPercent } from '../lib';
import Dominance from './Dominance';

const Header = () => {
  const [global, setGlobal] = useState('');
  const [trending, setTrending] = useState([]);

  const getGlobal = () => {
    const url = 'https://api.coingecko.com/api/v3/global';
    axios
      .get(url)
      .then((res) => res.data)
      .then((result) => setGlobal(result.data));
  };

  const getTrending = () => {
    const url = 'https://api.coingecko.com/api/v3/search/trending';
    axios
      .get(url)
      .then((res) => res.data)
      .then((result) => setTrending(result.coins));
  };

  useEffect(() => {
    getGlobal();
    getTrending();
  }, []);

  return (
    <div className="header">
      <div className="global-data">
        <h2>Global Data</h2>
        <div className="global">
          <h3>Total MarketCap: <span> {formatMarketCap(global.total_market_cap?.usd)}</span></h3>
          <h3>Active Crypto : <span>{global.active_cryptocurrencies}</span></h3>
        </div>
      </div>
      <div className="dominance">
        <h2>Dominance</h2>
        <div className="global">
          <h3>
            Bitcoin: {formatPercent(global.market_cap_percentage?.btc)}
          </h3>
          <h3>
            Ethereum: {formatPercent(global.market_cap_percentage?.eth)}
          </h3>
        </div>
      </div>
      <div className="trending">
        <h2>Top Trend</h2>
        <div className="global">
          <div className="top-trend">
            {' '}
            {trending.slice(0, 6).map((trend) => (
              <Dominance key={trend.item.id} trend={trend.item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
