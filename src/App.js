import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinResult from './components/CoinResult';
import Connexion from './components/Connexion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import { auth } from './utils/firebase.config';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { favorites, login } from './features/userSlice';
import WatchList from './components/WatchList';
import Header from './components/Header';

export const CoinsContext = createContext();

function App() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const myFavorite = useSelector(favorites);

  const getData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => setCoins(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser.displayName) {
        dispatch(login(currentUser));
      }
    });
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="App">
      <CoinsContext.Provider value={{ coins, setCoins, page, setPage }}>
        <BrowserRouter>
          <div className="navigation">
            <Navigation />
            <Connexion />
          </div>
            <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/currencies/:id" element={<CoinResult />} />
          </Routes>
        </BrowserRouter>
      </CoinsContext.Provider>
    </div>
  );
}

export default App;
