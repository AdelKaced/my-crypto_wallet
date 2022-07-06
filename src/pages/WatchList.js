import React from 'react';
import CoinList from '../components/CoinList';


const WatchList = () => {

    return (
        <div>
            <CoinList watchlist={true}/>
        </div>
    );
};

export default WatchList;