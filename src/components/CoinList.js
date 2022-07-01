import { getQueriesForElement } from '@testing-library/react';
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
  const [sortBy, setSortBy] = useState({});
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

  const handleSort = (e) => {
    console.log(e.target.id);
    // if (sortBy === e.target.id) {
    //   console.log('hein');
    //   setSortBy('');
    // } else {
    //   setSortBy(e.target.id);
    // }
    setSortBy({ [e.target.id]: !sortBy[e.target.id] });
  };

  const getSort = (a, b) => {
    // get key on the object sortBy and apply rules depending of case
    const keys = Object.keys(sortBy)[0];
    const keyArray = [
      'market_cap_rank',
      'id',
      'current_price',
      'price_change_24h',
      'market_cap',
      'ath',
      'ath_change_percentage',
    ];

    // loop in keyarray to avoid repeat action
    for (let i in keyArray) {
      if (keys === 'id' && keyArray[i] === 'id') {
        if (sortBy[keys]) {
          return b.id.localeCompare(a.id);
        } else {
          return a.id.localeCompare(b.id);
        }
      } else {
        if (keys === keyArray[i]) {
          if (sortBy[keyArray[i]]) {
            return b[keyArray[i]] - a[keyArray[i]];
          } else {
            return a[keyArray[i]] - b[keyArray[i]];
          }
        }
      }
    }

    // if (keys === 'market_cap_rank') {
    //   if (sortBy[keys]) {
    //     return b.market_cap_rank - a.market_cap_rank;
    //   } else {
    //     return a.market_cap_rank - b.market_cap_rank;
    //   }
    // } else if (keys === 'id') {
    //   if (sortBy[keys]) {
    //     return b.id.localeCompare(a.id);
    //   } else {
    //     return a.id.localeCompare(b.id);
    //   }
    // } else if (keys === 'current_price') {
    //   if (sortBy['current_price']) {
    //     return b.current_price - a.current_price;
    //   } else {
    //     return a.current_price - b.current_price;
    //   }
    // } else if (keys === 'price_change_24h') {
    //   if (sortBy['price_change_24h']) {
    //     return b.price_change_24h - a.price_change_24h;
    //   } else {
    //     return a.price_change_24h - b.price_change_24h;
    //   }
    // } else if (keys === 'market_cap') {
    //   if (sortBy['market_cap']) {
    //     return b.market_cap - a.market_cap;
    //   } else {
    //     return a.market_cap - b.market_cap;
    //   }
    // } else if (keys === 'ath') {
    //   if (sortBy['ath']) {
    //     return b.ath - a.ath;
    //   } else {
    //     return a.ath - b.ath;
    //   }
    // } else if (keys === 'ath_change_percentage') {
    //   if (sortBy['ath_change_percentage']) {
    //     return b.ath_change_percentage - a.ath_change_percentage;
    //   } else {
    //     return a.ath_change_percentage - b.ath_change_percentage;
    //   }
    // }
  };

  return (
    <div className="coinList">
      <table>
        <thead>
          <tr>
            <th className="rank" id="market_cap_rank" onClick={handleSort}>
              #
            </th>
            <th className="name" id="id" onClick={handleSort}>
              Name
            </th>
            <th id="current_price" onClick={handleSort}>
              Price
            </th>
            <th id="price_change_24h" onClick={handleSort}>
              24h %
            </th>
            <th id="market_cap" onClick={handleSort}>
              MarketCap
            </th>
            <th id="ath" onClick={handleSort}>
              ATH
            </th>
            <th id="ath_change_percentage" onClick={handleSort}>
              Percent ATH
            </th>
          </tr>
        </thead>
        <tbody>
          {!watchlist
            ? coins
                .sort((a, b) => getSort(a, b))
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
            : dbFavorites?.coin
                // .sort((a,b) => )
                .map((fav) => (
                  <CoinRowWatchlist
                    key={fav}
                    coin={fav}
                    dbFavorites={dbFavorites}
                  />
                ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
