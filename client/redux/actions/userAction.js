import { server } from '../store';
import axios from 'axios';

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
        console.log("data: ", data);
        
        console.log("end");
        
        dispatch({ type: signUpSuccess.type, payload: data }); 
    } catch (error) {
        dispatch({ type: signUpFail.type, payload: error.response.data.message }); 
    }
};

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
