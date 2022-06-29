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
    getFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { login, getFavorites } = userSlice.actions;

export const selectUser = (state) => state.connexion.user;
export const favorites = (state) => state.connexion.favorites;
export default userSlice.reducer;
