import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CoinChart = ({ coinId }) => {
  const [duration, setDuration] = useState(30);
  const [coinData, setCoinData] = useState();

  const headerData = [
    [1, '1 D'],
    [3, '3 D'],
    [7, '7 D'],
    [30, '1 M'],
    [181, '6 M'],
    [365, '1 Y'],
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
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          // width={500}
          // height={400}
          data={coinData}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82bf82" stopOpacity={1} />
              <stop offset="95%" stopColor="#ff8279" stopOpacity={1} />
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
      </ResponsiveContainer>
    </div>
  );
};

export default CoinChart;
