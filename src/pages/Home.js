import React from 'react';
import CoinList from '../components/CoinList';
import Pagination from '../components/Pagination';

const Home = () => {
  return (
    <div>
      <CoinList />
      <Pagination />
    </div>
  );
};

export default Home;
