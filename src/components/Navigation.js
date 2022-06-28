import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>My Crypto-Wallet Logo</li>
        <NavLink to="/">
          <li>Crypto Market</li>
        </NavLink>
        <li>WatchList</li>
        <li>Wallets</li>
      </ul>
    </nav>
  );
};

export default Navigation;
