import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebase.config';
import { addDoc, collection } from 'firebase/firestore';

const CoinRow = ({ coin, userId, fav}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [errorConnexion, setErrorConnexion] = useState(false);

  const handleFavorite = () => {
    if (userId) {
      const data = {
        userId,
        coin: [coin.id],
      };
      console.log(data);
      addDoc(collection(db, 'favorites'), data);
      setIsFavorite(!isFavorite);
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
          className={
            isFavorite ? 'fa-solid fa-star favorite' : 'fa-solid fa-star'
          }
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
