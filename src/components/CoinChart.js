import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CoinChart = ({ coinId }) => {
  const [duration, setDuration] = useState(30);
  const [coinData, setCoinData] = useState();

  const headerData = [
    [1, '1 day'],
    [3, '3 days'],
    [7, '7 days'],
    [30, '1 month'],
    [181, '6 months'],
    [365, '1 year'],
    [3000, 'Max'],
  ];

  useEffect(() => {
    let dataArray = [];
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
          duration > 32 ? '&interval=daily' : ''
        }`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];
          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < '50' ? price : parseInt(price),
          });
        }
        setCoinData(dataArray);
      });
  }, [duration, coinId]);

  return (
    <div className="coinChart">
      <div className="btn-container">
        {headerData.map((el) => {
          return (
            <div
              key={el[0]}
              htmlFor={'btn' + el[0]}
              onClick={() => {
                setDuration(el[0]);
              }}
              className={el[0] === duration ? 'btn active-btn' : 'btn'}
            >
              {el[1]}
            </div>
          );
        })}
      </div>
      <div className='chart'>
        <AreaChart
          width={1000}
          height={350}
          data={coinData}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={-1} stopColor="#82bf82" stopOpacity={1} />
              <stop offset={1} stopColor="#ff8279" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke="grey"
            fillOpacity={1}
            fill="url(#splitColor)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default CoinChart;