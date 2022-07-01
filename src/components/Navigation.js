import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CoinsContext } from '../App';
import { favorites } from '../features/userSlice';

const Navigation = () => {
  const context = useContext(CoinsContext);
  const myFavorites = useSelector(favorites);


  const getFavorites = () => {
    const filterData = context.coins.filter((coin) =>
      myFavorites.coin.includes(coin.id)
    );
    context.setCoins(filterData);
  };
  return (
    <nav>
      <ul>
        <li>My Crypto-Wallet Logo</li>
        <NavLink to="/">
          <li>Crypto Market</li>
        </NavLink>
        <NavLink to="/watchlist"><li>WatchList</li></NavLink>
        <li>Wallets</li>
      </ul>
    </nav>
  );
};

export default Navigation;
