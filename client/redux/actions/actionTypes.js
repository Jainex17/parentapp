export const createAction = (type) => {
    return {
      type: type
    };
  };
  
  export const signUpRequest = createAction('signUpRequest');
  export const signUpSuccess = createAction('signUpSuccess');
  export const signUpFail = createAction('signUpFail');
  
  export const loginRequest = createAction('loginRequest');
  export const loginSuccess = createAction('loginSuccess');
  export const loginFail = createAction('loginFail');

  export const verifyuserRequest = createAction('verifyuserRequest');
  export const verifyuserSuccess = createAction('verifyuserSuccess');
  export const verifyuserFail = createAction('verifyuserFail');

  export const getuserRequest = createAction('getuserRequest');
  export const getuserSuccess = createAction('getuserSuccess');
  export const getuserFail = createAction('getuserFail');

  export const getallpostsRequest = createAction('getallpostsRequest');
  export const getallpostsSuccess = createAction('getallpostsSuccess');
  export const getallpostsFail = createAction('getallpostsFail');

  // export const getpostbyidRequest = createAction('getpostbyidRequest');
  // export const getpostbyidSuccess = createAction('getpostbyidSuccess');
  // export const getpostbyidFail = createAction('getpostbyidFail');

  export const createpostRequest = createAction('createpostRequest');
  export const createpostSuccess = createAction('createpostSuccess');
  export const createpostFail = createAction('createpostFail');

  export const logoutRequest = createAction('logoutRequest');
  export const logoutSuccess = createAction('logoutSuccess');
  export const logoutFail = createAction('logoutFail');

  export const getfaqRequest = createAction('getfaqRequest');
  export const getfaqSuccess = createAction('getfaqSuccess');
  export const getfaqFail = createAction('getfaqFail');