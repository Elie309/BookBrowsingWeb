import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  username: string | null;
  access_token: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: null,
  access_token: localStorage.getItem('access_token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.access_token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export default userSlice.reducer;
