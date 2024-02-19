import { createReducer } from "@reduxjs/toolkit";

// Action creator types
export const signUpRequest = {
    type: 'signUpRequest'
};

export const signUpSuccess = {
    type: 'signUpSuccess'
};

export const signUpFail = {
    type: 'signUpFail'
};

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
    });
});
