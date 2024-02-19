import { server } from '../store';
import axios from 'axios';
import { signUpRequest, signUpSuccess, signUpFail, loginRequest, loginSuccess, loginFail } from './actionTypes';

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
        
        dispatch({ type: loginSuccess.type, payload: data });
    } catch (error) {
        dispatch({ type: loginFail.type, payload: error.response.data });
    }
}

