import React from 'react';
import { Link } from 'react-router-dom';

const Dominance = ({trend}) => {
  return (
    <div className='coin-dominance'>
    <img src={trend.thumb} />
     <Link to={`currencies/${trend.id}`}><span className="id" id={trend.id}>
        {trend.id}
      </span>
      <span className="symbol" id={trend.symbol}>
        {trend.symbol}
      </span>
      </Link> 

    </div>
  );
};

export default Dominance;
