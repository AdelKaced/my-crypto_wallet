import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinResult from './components/CoinResult';
import Connexion from './components/Connexion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import { auth } from './utils/firebase.config';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';

export const CoinsContext = createContext();

function App() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

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
      console.log(currentUser);
      dispatch(login(currentUser));
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/currencies/:id" element={<CoinResult />} />
          </Routes>
        </BrowserRouter>
      </CoinsContext.Provider>
    </div>
  );
}

export default App;
