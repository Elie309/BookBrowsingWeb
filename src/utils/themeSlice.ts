import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true' // Load theme preference from local storage
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString()); // Save theme preference to local storage
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
