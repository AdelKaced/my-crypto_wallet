import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CoinsContext } from '../App';
import { favorites, getFavorites, selectUser } from '../features/userSlice';
import { db } from '../utils/firebase.config';
import CoinRow from './CoinRow';
import CoinRowWatchlist from './CoinRowWatchlist';

const CoinList = ({ watchlist }) => {
  const coins = useContext(CoinsContext).coins;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const dbFavorites = useSelector(favorites);

  const isCoinFav = (coinId) => {
    return dbFavorites?.coin?.includes(coinId);
  };

  // get data from firebase and set value on Redux
  const getData = () => {
    getDocs(collection(db, 'favorites')).then((res) => {
      let favData = [];
      res.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        if (data.userId === user?.uid) {
          favData.push(data);
        }
      });
      dispatch(getFavorites(...favData));
    });
   
  };

  useEffect(() => {
    getData();
  }, [user]);

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
          {!watchlist
            ? coins
                // .filter((coin) => !watchlist || dbFavorites?.coin.includes(coin.id))
                .map((coin) => (
                  <CoinRow
                    key={coin.symbol}
                    coin={coin}
                    userId={user?.uid}
                    hasFav={dbFavorites} // check if current user has at least one favorite
                    isFav={isCoinFav(coin.id)} // check if coin mapped is one of the favorite coins
                  />
                ))
            : dbFavorites?.coin.map((fav) => <CoinRowWatchlist key={fav} coin={fav} dbFavorites={dbFavorites}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
