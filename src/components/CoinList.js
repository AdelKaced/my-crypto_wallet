import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CoinsContext } from '../App';
import { favorites, getFavorites, selectUser } from '../features/userSlice';
import { db } from '../utils/firebase.config';
import CoinRow from './CoinRow';
import CoinRowWatchlist from './CoinRowWatchlist';

const CoinList = ({ watchlist }) => {
  const [sortBy, setSortBy] = useState({ market_cap_rank: false });
  const coins = useContext(CoinsContext).coins;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const dbFavorites = useSelector(favorites);

  console.log(dbFavorites);
  const keyArray = [
    'market_cap_rank',
    'id',
    'current_price',
    'price_change_24h',
    'market_cap',
    'ath',
    'ath_change_percentage',
  ];

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
    if (e.target.id) setSortBy({ [e.target.id]: !sortBy[e.target.id] });
  };

  const getSort = (a, b) => {
    // get key on the object sortBy and apply rules depending of case
    const keys = Object.keys(sortBy)[0];

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
  };

  return (
    <div className="coinList">
      {!watchlist || user ?
      <table>
        <thead>
          <tr>
            <th
              className="market_cap_rank"
              id="market_cap_rank"
              onClick={handleSort}
            >
              {' '}
              #
              {!watchlist && <span
                className={
                  Object.keys(sortBy)[0] !== 'market_cap_rank'
                    ? 'sort'
                    : sortBy['market_cap_rank']
                    ? 'sort ascending'
                    : 'sort descending'
                }
              ></span>}
            </th>
            <th className="id" id="id" onClick={handleSort}>
              Name
              {!watchlist && <span
                className={
                  Object.keys(sortBy)[0] !== 'id'
                    ? 'sort'
                    : sortBy['id']
                    ? 'sort ascending'
                    : 'sort descending'
                }
              ></span>}
            </th>
            <th id="current_price" onClick={handleSort}>
              Price
              {!watchlist && <span
                className={
                  Object.keys(sortBy)[0] !== 'current_price'
                    ? 'sort'
                    : sortBy['current_price']
                    ? 'sort ascending'
                    : 'sort descending'
                }
              ></span>}
            </th>
            <th id="price_change_24h" onClick={handleSort}>
              24h %
              {!watchlist && <span
                className={
                  Object.keys(sortBy)[0] !== 'price_change_24h'
                    ? 'sort'
                    : sortBy['price_change_24h']
                    ? 'sort ascending'
                    : 'sort descending'
                }
              ></span>}
            </th>
            <th id="market_cap" onClick={handleSort}>
              MarketCap
              {!watchlist && <span
                className={
                  Object.keys(sortBy)[0] !== 'market_cap'
                    ? 'sort'
                    : sortBy['market_cap']
                    ? 'sort ascending'
                    : 'sort descending'
                }
              ></span>}
            </th>
            <th id="ath" onClick={handleSort}>
              ATH
              {!watchlist && <span
                className={
                  Object.keys(sortBy)[0] !== 'ath'
                    ? 'sort'
                    : sortBy['ath']
                    ? 'sort ascending'
                    : 'sort descending'
                }
              ></span>}
            </th>
            <th id="ath_change_percentage" onClick={handleSort}>
              Percent ATH
              {!watchlist && <span
                className={
                  Object.keys(sortBy)[0] !== 'ath_change_percentage'
                    ? 'sort'
                    : sortBy['ath_change_percentage']
                    ? 'sort ascending'
                    : 'sort descending'
                }
              ></span>}
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
            :  dbFavorites && [...dbFavorites?.coin]
            // .sort((a, b) => b.localeCompare(a))
            .map((fav) => (
                <CoinRowWatchlist
                  key={fav}
                  coin={fav}
                  dbFavorites={dbFavorites}
                />
              ))
              }
        </tbody>
      </table>
     : <p>
       You need to be connected !
     </p>   }
    </div>
  );
};

export default CoinList;
