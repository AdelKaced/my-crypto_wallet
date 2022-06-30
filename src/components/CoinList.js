import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CoinsContext } from '../App';
import { favorites, getFavorites, selectUser } from '../features/userSlice';
import { db } from '../utils/firebase.config';
import CoinRow from './CoinRow';

const CoinList = () => {
  const coins = useContext(CoinsContext).coins;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const dbFavorites = useSelector(favorites);

  // get data from current user
  const filterFavorites = () => {
    // get data from connected user
    if (dbFavorites) {
      console.log(dbFavorites);
      return dbFavorites?.find((fav) => user?.uid === fav.userId);
    }
  };

  // check if coinid is present the db coin array
  const isCoinFav = (id) => {
    return filterFavorites()?.coin.includes(id);
  };

  // get data from firebase and set value on Redux
  const getData = () => {
    getDocs(collection(db, 'favorites')).then((res) => {
      dispatch(
        getFavorites(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
          {coins.map((coin) => (
            <CoinRow
              key={coin.symbol}
              coin={coin}
              userId={user?.uid}
              hasFav={filterFavorites()} // check if current user has at least one favorite
              isFav={isCoinFav(coin.id)} // check if coin mapped is one of the favorite coins
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
