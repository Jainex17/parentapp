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