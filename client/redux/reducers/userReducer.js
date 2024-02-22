import { createReducer } from "@reduxjs/toolkit";
import {
  signUpRequest,
  signUpSuccess,
  signUpFail,
  loginRequest,
  loginSuccess,
  loginFail,
  verifyuserRequest,
  verifyuserSuccess,
  verifyuserFail,
  getuserRequest,
  getuserSuccess,
  getuserFail,
  getfaqRequest,
  getfaqSuccess,
  getfaqFail,
  getallpostsRequest,
  getallpostsSuccess,
  getallpostsFail,
  createpostRequest,
  createpostSuccess,
  createpostFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  getuserprofileRequest,
  getuserprofileSuccess,
  getuserprofileFail,
  getpostbyidRequest,
  getpostbyidFail,
  getpostbyidSuccess,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  loading: false,
  postsloading: true,
  createingpostloading: false,
  createpoststatus: false,
  faqloading: false,
  user: null,
  userprofile: null,
  error: null,
  posts: [],
  postbyid: {},
  faq: [],
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
    })
    .addCase(createpostRequest.type, (state, action) => {
      state.createingpostloading = true;
    })
    .addCase(createpostSuccess.type, (state, action) => {
      state.createingpostloading = false;
      state.createpoststatus = true;
    })
    .addCase(createpostFail.type, (state, action) => {
      state.createingpostloading = false;
      state.error = action.payload;
    })
    .addCase(logoutRequest.type, (state, action) => {
      state.loading = true;
    })
    .addCase(logoutSuccess.type, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase(logoutFail.type, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getfaqRequest.type, (state, action) => {
      state.faqloading = true;
    })
    .addCase(getfaqSuccess.type, (state, action) => {
      state.faqloading = false;
      state.faq = action.payload;
    })
    .addCase(getfaqFail.type, (state, action) => {
      state.faqloading = false;
      state.error = action.payload;
    })
    .addCase(getuserprofileRequest.type, (state, action) => {
      state.loading = true;
    })
    .addCase(getuserprofileSuccess.type, (state, action) => {
      state.loading = false;
      state.userprofile = action.payload;
    })
    .addCase(getuserprofileFail.type, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getpostbyidRequest.type, (state, action) => {
      state.postsloading = true;
    })
    .addCase(getpostbyidSuccess.type, (state, action) => {
      state.postsloading = false;
      state.postbyid = action.payload;
    })
    .addCase(getpostbyidFail.type, (state, action) => {
      state.postsloading = false;
      state.error = action.payload;
    });

});
