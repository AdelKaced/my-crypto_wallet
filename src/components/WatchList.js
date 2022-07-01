import React from 'react';
import CoinList from './CoinList';

const WatchList = () => {

    return (
        <div>
            <CoinList watchlist={true}/>
        </div>
    );
};

export default WatchList;