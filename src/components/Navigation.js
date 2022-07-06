import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <NavLink to="/">
          <li className="logo">
            <div>
              <img src="crypto_logo1.png" />
              <h1>C-Wallet</h1>
            </div>
          </li>
        </NavLink>
        <NavLink to="/">
          <li>Crypto Market</li>
        </NavLink>
        <NavLink to="/watchlist">
          <li>WatchList</li>
        </NavLink>
        <NavLink to="/wallet">
          {' '}
          <li>Wallets</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
