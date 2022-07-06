import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinChart from './CoinChart';

const CoinResult = () => {
  const [coinData, setCoinData] = useState('');
  const params = useParams();
  

  const getCoinData = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false&vs_currency=usd`
      )
      .then((res) => setCoinData(res.data));
  };

  useEffect(() => {
    getCoinData();
     // eslint-disable-next-line
  }, [params]);

  const getProgressDay = () => {
    let percent =
      ((coinData.market_data?.current_price.usd -
        coinData.market_data?.low_24h.usd) /
        (coinData.market_data?.high_24h.usd -
          coinData.market_data?.low_24h.usd)) *
      100;
    if (percent <= 0) percent = 1;
    percent += '%';
  
    return percent;
  };
  return (
    <div>
      <div className="result-header">
      
          <div className="main">
            <img src={coinData.image?.small} alt={coinData.id} />
            <h1>{coinData.id}</h1>
            <h2>{coinData.symbol}</h2>
          </div>
      
        <div className="market-data">
          <div className="current-price">
            <h3>$ {coinData.market_data?.current_price.usd}</h3>

            <h4>
              {Math.round(
                coinData.market_data?.price_change_percentage_24h_in_currency
                  .usd * 100
              ) / 100}
              %
            </h4>
          </div>
          <div className="progess">
            <div>Low: {coinData.market_data?.low_24h.usd} </div>

            <div className="progess-bar">
              <div
                className="current-progess"
                style={{ width: getProgressDay() }}
              ></div>
            </div>
            <div>High: {coinData.market_data?.high_24h.usd}</div>
          </div>
        </div>
      </div>
      <CoinChart coinId={params.id} />
    </div>
  );
};

export default CoinResult;
