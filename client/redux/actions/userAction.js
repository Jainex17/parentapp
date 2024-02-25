import { server } from "../store";
import axios from "axios";
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
  getallpostsRequest,
  getallpostsSuccess,
  getallpostsFail,
  createpostRequest,
  createpostSuccess,
  createpostFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  getfaqRequest,
  getfaqSuccess,
  getfaqFail,
  getuserprofileRequest,
  getuserprofileFail,
  getuserprofileSuccess,
  postdetailRequest,
  postdetailSuccess,
  postdetailFail,
  getuserpostRequest,
  getuserpostSuccess,
  getuserpostFail,
  likepostRequest,
  likepostSuccess,
  likepostFail,
} from "./actionTypes";
export const signup =
  ({ username, password, email, pfpimage }) =>
  async (dispatch) => {
    try {
      dispatch({ type: signUpRequest.type });
      
      const formdata = new FormData();
      formdata.append("image", pfpimage);

      const loadblob = await axios.post(
        `${server}/loadblob?name=${username}&client=kadia`,
        formdata
      );

      const pimg = loadblob.data;

      const rawdata = {
        username: username,
        password: password,
        client: "kadia",
        email: email,
        age: "0",
        gender: "",
        tags: "",
        bio: "",
        profession: "",
        pimg: pimg,
      };

      const { data } = await axios.post(`${server}/setusr`, rawdata);

      dispatch({ type: signUpSuccess.type, payload: data });
    } catch (error) {
      dispatch({ type: signUpFail.type, payload: error.response.data });
    }
  };

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: loginRequest.type });
      const { data } = await axios.get(
        `${server}/verifyusr?username=${username}&password=${password}&client=kadia`
      );

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("username", username);

      dispatch({ type: loginSuccess.type, payload: data });
    } catch (error) {
      dispatch({ type: loginFail.type, payload: error.response.data });
    }
  };

export const verifyuser = () => async (dispatch) => {
  try {
    dispatch({ type: verifyuserRequest.type });
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const { data } = await axios.get(
      `${server}/verifyjwt?username=${username}&jwt=${token}&client=kadia`
    );

    dispatch({ type: verifyuserSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: verifyuserFail.type, payload: error.response.data });
  }
};

export const getuser = (username) => async (dispatch) => {
  try {
    dispatch({ type: getuserRequest.type });
    
    const { data } = await axios.get(
      `${server}/getusr?username=${username}&client=kadia`
    );

    dispatch({ type: getuserSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: getuserFail.type, payload: error.response.data });
  }
};

export const getuserprofile = (username) => async (dispatch) => {
  try {
    dispatch({ type: getuserprofileRequest.type });
    const { data } = await axios.get(
      `${server}/getusr?username=${username}&client=kadia`
    );
    dispatch({ type: getuserprofileSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: getuserprofileFail.type, payload: error.response.data });
  }
};


export const getallposts = () => async (dispatch) => {
  try {
    dispatch({ type: getallpostsRequest.type });
    
    const { data } = await axios.get(`${server}/getallposts?client=kadia`);
   

    dispatch({ type: getallpostsSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: getallpostsFail.type, payload: error.response.data });
  }
};

export const createpost =
  ({ postTitle, textareavalue, postimages, resultArray }) =>
  async (dispatch) => {
    try {
      dispatch({ type: createpostRequest.type });
      
      const username = localStorage.getItem("username");
      let rawdata = {};
      
      if (postimages[0]) {
        const formdata = new FormData();
        formdata.append("image", postimages[0]);

        const loadblob = await axios.post(
          `${server}/loadblob?name=${username}&client=kadia`,
          formdata
        );

        const pimg = loadblob.data;

        rawdata = {
          username: username,
          client: "kadia",
          photo: pimg,
          title: postTitle,
          disc: textareavalue,
          ptype: "post",
          tags: resultArray.join(','),
        };
      } else {
        rawdata = {
          username: username,
          client: "kadia",
          title: postTitle,
          disc: textareavalue,
          ptype: "post",
          tags: resultArray.join(',')
        };
      }
      
      const { data } = await axios.post(`${server}/createpost`, rawdata);
      
      dispatch({ type: createpostSuccess.type, payload: data });
    } catch (error) {    
      dispatch({ type: createpostFail.type, payload: error.response });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: logoutRequest.type });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch({ type: logoutSuccess.type });
  } catch (error) {
    dispatch({ type: logoutFail.type, payload: error.response.data });
  }
};

export const getfaq = () => async (dispatch) => {
  try {
    dispatch({ type: getfaqRequest.type });
    const { data } = await axios.get(`${server}/news?client=kadia`);
    dispatch({ type: getfaqSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: getfaqFail.type, payload: error.response.data });
  }
};

export const getpostdetails = (pid,username) => async (dispatch) => {
  try {
    dispatch({ type: postdetailRequest.type });
    const { data } = await axios.get(`${server}/getpost?username=${username}&client=kadia&pid=${pid}`);

    dispatch({ type: postdetailSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: postdetailFail.type, payload: error.response.data });
  }
}

export const getuserposts = (username) => async (dispatch) => {
  try {
    dispatch({ type: getuserpostRequest.type });
    const { data } = await axios.get(`${server}/getallpostsbyuser?username=${username}&client=kadia`);

    dispatch({ type: getuserpostSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: getuserpostFail.type, payload: error.response.data });
  }
}

export const likepost = (pid,username,currentusername) => async (dispatch) => {
  try {
    dispatch({ type: likepostRequest.type });
    console.log(pid,username,currentusername);
    
    const { data } = await axios.get(`${server}/likepost?username=${username}&client=kadia&pid=${pid}&uu=${currentusername}`);

    dispatch({ type: likepostSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: likepostFail.type, payload: error.response.data });
  }
}

export const unlikepost = (pid,username,currentusername) => async (dispatch) => {
  try {
    dispatch({ type: likepostRequest.type });
    console.log(pid,username,currentusername);
    
    const { data } = await axios.get(`${server}/unlikepost?username=${username}&client=kadia&pid=${pid}&uu=${currentusername}`);

    dispatch({ type: likepostSuccess.type, payload: data });
  } catch (error) {
    dispatch({ type: likepostFail.type, payload: error.response.data });
  }
}