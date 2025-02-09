import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  userContext: any | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userContext: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.userContext = action.payload;
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('refresh_token', action.payload.refresh_token);

    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userContext = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export default userSlice.reducer;
