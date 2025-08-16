import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    expiresAt: null, // Add expiresAt to the initial state
  },
  reducers:{
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser:(state, action) => {
      state.user = action.payload;
      // Set expiration time to 24 hours from now
      if (action.payload) {
        state.expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000);
      } else {
        state.expiresAt = null;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.expiresAt = null;
    }
  }
});

export const { setLoading, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
