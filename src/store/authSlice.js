import { createSlice } from "@reduxjs/toolkit";

// Initial state for auth
const initialState = {
    status : false, // user is not logged in by default
    userData: null // no user data initially
}

// Create auth slice for login/logout actions
const authSlice = createSlice({
    name: "auth", // slice name
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true; // set logged in
            state.userData = action.payload.userData; // store user data
        },
        logout: (state) => {
            state.status = false; // set logged out
            state.userData = null; // clear user data
        }
     }
})

// Export actions
export const {login, logout} = authSlice.actions;

// Export reducer
export default authSlice.reducer;