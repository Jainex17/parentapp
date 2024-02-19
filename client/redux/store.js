import {configureStore} from '@reduxjs/toolkit'; 
import {userReducer} from './reducers/userReducer';

export const server = "https://kadia.pythonanywhere.com/api";

const store = configureStore({
    reducer:{
        user:userReducer,
    },
});

export default store