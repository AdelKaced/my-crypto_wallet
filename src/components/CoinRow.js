import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebase.config';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import {
  addFavorite,
  getFavorites,
  updateFavorite,
} from '../features/userSlice';

const CoinRow = ({ coin, userId, isFav, hasFav }) => {
  const [errorConnexion, setErrorConnexion] = useState(false);

  const dispatch = useDispatch();
  const handleFavorite = async () => {
    if (userId) {
      let data = {
        userId,
        coin: [coin.id],
      };
      console.log(data);

      if (!hasFav) {
        // add data when user don't have any favorite
        await addDoc(collection(db, 'favorites'), data).then(() => {
          dispatch(addFavorite(data));

          // just after adding collection getfavorite allow to get the id of document
          // getDocs(collection(db, 'favorites')).then((res) => {
          //   dispatch(
          //     getFavorites(
          //       res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          //     )
          //   );
          // });
          
            // just after adding collection getfavorite allow to get the id of document
          getDocs(collection(db, 'favorites')).then((res) => {
            let favData = [];
            res.docs.forEach((doc) => {
              const data = { ...doc.data(), id: doc.id };
              if (data.userId === userId) {
                favData.push(data);
              }
            });
            dispatch(getFavorites(...favData));
          });

          // get id of data
        });
      } else {
        // when user has already one or more favorite
        const dbData = {
          userId,
          // if coin id is not on the array I push on it else I remove from the array
          coin: !hasFav.coin.includes(data.coin[0])
            ? [...hasFav.coin, data.coin[0]]
            : hasFav.coin.filter((id) => id !== data.coin[0]),
        };

        console.log('dbData', dbData);

        await updateDoc(doc(db, 'favorites', hasFav.id), dbData).then(() => {
          // add additional data to redux to match first render of dbFavorites
          dbData.id = hasFav.id;
          dispatch(updateFavorite(dbData));
        });
      }
      // setIsFavorite(!isFavorite);
    } else {
      setErrorConnexion(true);
      setTimeout(() => {
        setErrorConnexion(false);
      }, 1000);
    }
  };

  const athVariation = (coin) => {
    let variation = ((coin.ath - coin.current_price) / coin.ath) * 100;
    variation = Math.round(variation * 100) / 100;
    return variation;
  };

  return (
    <tr>
      <td className="rank">
        <i
          className={isFav ? 'fa-solid fa-star favorite' : 'fa-solid fa-star'}
          onClick={handleFavorite}
        ></i>
        {errorConnexion && <p className="message">Must be connected !</p>}
        {coin.market_cap_rank}
      </td>

      <td className="name">
        <img src={coin.image} alt={coin.symbol} className="coin-logo" />{' '}
        <Link to={`/currencies/${coin.id}`}>
          {coin.name} <span className="symbol">{coin.symbol}</span>{' '}
        </Link>
      </td>

      <td> {coin.current_price}</td>
      <td>{Math.round(coin.price_change_percentage_24h * 100) / 100}%</td>
      <td>{coin.market_cap}</td>
      <td>{coin.ath}</td>
      <td>{athVariation(coin)}%</td>
    </tr>
  );
};

export default CoinRow;
