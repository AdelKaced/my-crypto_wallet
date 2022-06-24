import React from 'react';
import Header from '../components/Header';
import CoinList from '../components/CoinList';
import Pagination from '../components/Pagination';

const Home = () => {
  return (
    <div>
      <Header />
      <CoinList />
      <Pagination />
    </div>
  );
};

export default Home;
