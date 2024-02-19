import { createReducer } from "@reduxjs/toolkit";
import { signUpRequest, signUpSuccess, signUpFail, loginRequest, loginSuccess, loginFail } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signUpRequest.type, (state, action) => {
      state.loading = true;
    })
    .addCase(signUpSuccess.type, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(signUpFail.type, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(loginRequest.type, (state, action) => {
      state.loading = true;
    })
    .addCase(loginSuccess.type, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loginFail.type, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
