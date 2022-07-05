import React from 'react';

const Dominance = ({trend}) => {
  return (
    <div className='coin-dominance'>
    <img src={trend.thumb} />
      <span className="id" id={trend.id}>
        {trend.id}
      </span>
      <span className="symbol" id={trend.symbol}>
        {trend.symbol}
      </span>

    </div>
  );
};

export default Dominance;
