import * as actionType from './actionTypes';
import { push } from 'react-router-redux';
import axios from 'axios';
import {API_URL} from '../../constants';

export const loginUserSuccess = (payload) => {
    console.log('Inside dispatch loginUserSuccess');
    return {
        type: actionType.AUTH_USER,
        payload: payload,
    };
}

export const loginUser = (data) => {
    console.log('Inside auth action login user before async call');
    return async dispatch => {
        try {
            console.log('Inside auth action login user inside async call');
            //const payload = {};
            const payload = await axios.post(`${API_URL}/login`, data);
            localStorage.setItem("jwt", payload.data.jwt);
            localStorage.setItem("user", JSON.stringify(payload.data.user));
            dispatch(loginUserSuccess(payload.data.user));
            dispatch(push('/'));
        } catch (err) {
            showError(err);
        }
    }
}
export const logoutUser = () => {
    return {
        type: actionType.LOGOUT_USER,
    };
}

export const showError = (isErrorReceived) => {
    return {
        type: actionType.ERROR_RECEIVED,
        isErrorReceived: isErrorReceived,
    };
}