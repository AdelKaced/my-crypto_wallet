import axios from 'axios';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateFavorite } from '../features/userSlice';
import { formatCurrency, formatPercent, formatMarketCap } from '../lib';
import { db } from '../utils/firebase.config';

const CoinRowWatchlist = ({ coin, dbFavorites }) => {
  const [favCoin, setFavCoin] = useState([]);
  const dispatch = useDispatch();

  const handleFavorite = () => {
    const data = {
      userId: dbFavorites.userId,
      // remove coin from favory list
      coin: dbFavorites.coin.filter((res) => res !== coin),
    };
    updateDoc(doc(db, 'favorites', dbFavorites.id), data).then(() => {
      data.id = dbFavorites.id; // add doc id to match with data when get it if not we can make action only one time
      dispatch(updateFavorite(data));
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false&currency=usd`
      )
      .then((res) => setFavCoin(res.data));
    // eslint-disable-next-line
  }, []);

  return (
    <tr>
      <td className="market_cap_rank">
        <i className={'fa-solid fa-star favorite'} onClick={handleFavorite}></i>
        {favCoin.market_cap_rank}
      </td>
      <td className="id">
        <img
          src={favCoin.image?.small}
          alt={favCoin.symbol}
          className="coin-logo"
        />{' '}
        <Link to={`/currencies/${favCoin.id}`}>
          {favCoin.name} <span className="symbol">{favCoin.symbol}</span>{' '}
        </Link>
      </td>

      <td >
        {' '}
        {formatCurrency(favCoin.market_data?.current_price.usd)}
      </td>
      <td
        style={{
          color:
            favCoin.market_data?.price_change_percentage_24h > 0
              ? '#16c784'
              : '#ea3943',
        }}
      >
        {formatPercent(favCoin.market_data?.price_change_percentage_24h)}
      </td>
      <td className="market_cap">{formatMarketCap(favCoin.market_data?.market_cap.usd)}</td>
      <td className="ath">{formatCurrency(favCoin.market_data?.ath.usd)}</td>
      <td style={{ color: '#ea3943' }}>
        {formatPercent(favCoin.market_data?.ath_change_percentage.usd)}
      </td>
    </tr>
  );
};

export default CoinRowWatchlist;
