import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [isMenu, setMenu] = useState(false);
  return (
    <div>
      {!isMenu ? (
        <div
          className="menu"
          onClick={() => {
            setMenu(true);
          }}
        >
          <i class="fa-solid fa-bars"></i>
        </div>
      ) : (
        <div className="cross" onClick={() => setMenu(false)}>
          {' '}
          <i class="fa-solid fa-xmark"></i>
        </div>
      )}
      <NavLink to="/">
        <div className="logo">
          <div>
            <img src="crypto_logo1.png" alt='website-logo'/>
            <h1>C-Wallet</h1>
          </div>
        </div>
      </NavLink>
      <div className="navigation">
        <nav className={isMenu && 'show-menu'}>
          <ul onClick={() => setMenu(false)}>
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
      </div>
    </div>
  );
};

export default Navigation;
