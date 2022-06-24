import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import Connexion from './components/Connexion';
import Navigation from './components/Navigation';
import Home from './pages/Home';

export const CoinsContext = createContext();

function App() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
      )
      .then((res) => res.data)
      .then((data) => setCoins(data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <div className="navigation">
        <Navigation />
        <Connexion />
      </div>
      <CoinsContext.Provider value={{ coins, setCoins, page, setPage }}>
        <Home />
      </CoinsContext.Provider>
    </div>
  );
}

export default App;
