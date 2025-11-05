import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    loading: false,
  },
  reducers: {
    // Set user
    setUser(state, action) {
      state.user = action.payload;
    },
    // Logout user 
    logout(state) {
      state.user = null;
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
