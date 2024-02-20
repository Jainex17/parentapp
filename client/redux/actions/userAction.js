import { server } from '../store';
import axios from 'axios';
import { signUpRequest, signUpSuccess, signUpFail, loginRequest, loginSuccess, loginFail, verifyuserRequest, verifyuserSuccess, verifyuserFail, getuserRequest, getuserSuccess, getuserFail } from './actionTypes';
import { getallpostsRequest, getallpostsSuccess, getallpostsFail } from './actionTypes';

export const signup = ({ username, password, email, pfpimage }) => async (dispatch) => {
    try {
        dispatch({ type: signUpRequest.type });
        console.log("called");
        
        const formdata = new FormData();
        formdata.append("image", pfpimage);

        const loadblob = await axios.post(`${server}/loadblob?name=${username}&client=kadia`, formdata);
        
        const pimg = loadblob.data;
        
        const rawdata = {
            "username": username,
            "password": password,
            "client": "kadia",
            "email": email,
            "age": "0",
            "gender": "",
            "tags": "",
            "bio": "",
            "profession": "",
            "pimg": pimg
        }

        const { data } = await axios.post(`${server}/setusr`, rawdata);
        
        dispatch({ type: signUpSuccess.type, payload: data }); 
    } catch (error) {
        dispatch({ type: signUpFail.type, payload: error.response.data }); 
    }
};

export const login = ({ username, password }) => async (dispatch) => {
    try {
        dispatch({ type: loginRequest.type });
        const { data } = await axios.get(`${server}/verifyusr?username=${username}&password=${password}&client=kadia`);
        
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('username', username);
        
        dispatch({ type: loginSuccess.type, payload: data });
    } catch (error) {
        dispatch({ type: loginFail.type, payload: error.response.data });
    }
}

export const verifyuser = () => async (dispatch) => {
    try {
        dispatch({ type: verifyuserRequest.type });
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        const { data } = await axios.get(`${server}/verifyjwt?username=${username}&jwt=${token}&client=kadia`);
        
        dispatch({ type: verifyuserSuccess.type, payload: data });
    } catch (error) {
        dispatch({ type: verifyuserFail.type, payload: error.response.data });
    }
}

export const getuser = (username) => async (dispatch) => {
    try {
        dispatch({ type: getuserRequest.type });
        
        const { data } = await axios.get(`${server}/getusr?username=${username}&client=kadia`);
        
        dispatch({ type: getuserSuccess.type, payload: data });
    }
    catch (error) {
        dispatch({ type: getuserFail.type, payload: error.response.data });
    }
}

export const getallposts = () => async (dispatch) => {
    try {
        dispatch({ type: getallpostsRequest.type });
        
        const { data } = await axios.get(`${server}/getallposts?client=kadia`);
        
        dispatch({ type: getallpostsSuccess.type, payload: data });
    }
    catch (error) {
        dispatch({ type: getallpostsFail.type, payload: error.response.data });
    }
}
