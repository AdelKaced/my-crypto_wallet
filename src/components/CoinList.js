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
  console.log(dbFavorites);

  // get data from current user
  // const filterFavorites = () => {
  //   // get data from connected user
  //   if (dbFavorites) {
  //     return dbFavorites?.find((fav) => user?.uid === fav.userId);
  //   }
  // };

  // check if coinid is present the db coin array
  // const isCoinFav = (id) => {
  //   return filterFavorites()?.coin.includes(id);
  // };

  const isCoinFav = (coinId) => {
      return dbFavorites?.coin?.includes(coinId)
  };

  // get data from firebase and set value on Redux
  const getData = () => {
    getDocs(collection(db, 'favorites')).then((res) => {
      let favData = [];
      res.docs.forEach((doc) => { 
        const data = { ...doc.data(),  id: doc.id};
        console.log('data.userId ', data.userId);
        console.log(user?.uid);
        if (data.userId === user?.uid) {
          favData.push(data);
        }
      });
      console.log(...favData);
      dispatch(getFavorites(...favData))
      // dispatch(
      //   getFavorites(
      //     res.docs.map((doc) => {
      //       const data = { ...doc.data() };
      //       console.log('data.userId ', data.userId);
      //       console.log(user?.uid);
      //       if (data.userId === user?.uid) {
      //         favData.push(data);
      //         console.log(favData);
      //         return {
      //           ...favData,
      //           id: doc.id,
      //         };
      //       }
      //     })
      //   )
      // );
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
          {coins.map((coin) => (
            <CoinRow
              key={coin.symbol}
              coin={coin}
              userId={user?.uid}
              hasFav={dbFavorites} // check if current user has at least one favorite
              isFav={isCoinFav(coin.id)} // check if coin mapped is one of the favorite coins
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
