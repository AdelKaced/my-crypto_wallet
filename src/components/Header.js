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
          <div className="data-global">
            <h3>MarketCap</h3>
            <h4> {formatMarketCap(global.total_market_cap?.usd)}</h4>
          </div>
          <div className="data-global">
            <h3>Active Crypto</h3>
            <h4>{global.active_cryptocurrencies}</h4>
          </div>
        </div>
      </div>
      <div className="dominance">
        <h2>Dominance</h2>
        <div className="global">
          <div className="data-global">
            <h3>Bitcoin </h3>
            <h4>{formatPercent(global.market_cap_percentage?.btc)}</h4>
          </div>
          <div className="data-global">
            <h3>Ethereum</h3>
            <h4>{formatPercent(global.market_cap_percentage?.eth)}</h4>
          </div>
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
