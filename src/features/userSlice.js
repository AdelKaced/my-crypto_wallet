import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  favorites: null,
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    getFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites = action.payload;
    },
    updateFavorite: (state, action) => {
      // need to be on a array to match with dbFAvorites on coinList data
      state.favorites = action.payload;
    },
  },
});

export const {
  login,
  logout,
  getFavorites,
  addFavorite,
  updateFavorite,
} = userSlice.actions;

export const selectUser = (state) => state.connexion.user;
export const favorites = (state) => state.connexion.favorites;
export default userSlice.reducer;
