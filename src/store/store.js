// Redux store setup
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

// Create store with auth reducer
const store = configureStore({
    reducer: {
        auth : authSlice, // handles authentication state
    }
});

// Export store instance
export default store;