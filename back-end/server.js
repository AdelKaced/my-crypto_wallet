require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const app = express();
app.use(express.json());

const api = axios.create({
  method: 'GET',
  baseUrl: 'https://sandbox-api.coinmarketcap.com',
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API,
    Accept: 'application/json',
    'Accept-Encoding': 'deflate, gzip',
  },
});

app.get('/api', (req, res) => {
  api('/v1/cryptocurrency/listings/latest?limit=1000&convert=USD')
    .then((res) => res.data)
    .then((value) => res.json(value.data))
    .catch((err) => console.log(err));
});

app.listen(4000, () => {
  console.log('server is running');
});
