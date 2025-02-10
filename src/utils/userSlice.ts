import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  username: string | null;
  role: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.role = action.payload.role;

      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('role', action.payload.role);

    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;

      localStorage.removeItem('username');
      localStorage.removeItem('role');
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export default userSlice.reducer;
