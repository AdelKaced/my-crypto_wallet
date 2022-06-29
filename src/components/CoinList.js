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

  // check if coinid is present the db coin array
  const filterFavorites = (id) => {
    // get data from connected user
    const filterFav =  dbFavorites?.find((fav) => user?.uid === fav.userId);
    console.log(filterFav);
    return filterFav.coin.includes(id)
  }

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

  // const isFilterFavorite = (id) => {
  //   console.log(filterFavorites);
  //   console.log(id);
  //   const isFav = filterFavorites?.includes(id);
  //   console.log(isFav);
  // }

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
              fav={filterFavorites(coin.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
