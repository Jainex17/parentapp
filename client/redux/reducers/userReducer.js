import { createReducer } from "@reduxjs/toolkit";
import { signUpRequest, signUpSuccess, signUpFail, loginRequest, loginSuccess, loginFail, verifyuserRequest, verifyuserSuccess, verifyuserFail, getuserRequest, getuserSuccess, getuserFail } from "../actions/actionTypes";
import { getallpostsRequest, getallpostsSuccess, getallpostsFail } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  loading: false,
  postsloading: true,
  user: null,
  error: null,
  posts: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signUpRequest.type, (state, action) => {
      state.loading = true;
    })
    .addCase(signUpSuccess.type, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
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
    })
    .addCase(loginFail.type, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(verifyuserRequest.type, (state, action) => {
      state.loading = true;
    })
    .addCase(verifyuserSuccess.type, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(verifyuserFail.type, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getuserRequest.type, (state, action) => {
      state.loading = true;
    })
    .addCase(getuserSuccess.type, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(getuserFail.type, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getallpostsRequest.type, (state, action) => {
      state.postsloading = true;
    })
    .addCase(getallpostsSuccess.type, (state, action) => {
      state.postsloading = false;
      state.isAuthenticated = true;
      state.posts = action.payload;
    })
    .addCase(getallpostsFail.type, (state, action) => {
      state.postsloading = false;
      state.error = action.payload;
    });
});
