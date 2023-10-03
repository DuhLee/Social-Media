import { AUTH, OAUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {

    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/posts')
    } catch (error) {
        console.log(error.message);
    }
}

export const signup = (formData, history) => async (dispatch) => {

    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push('/auth')
    } catch (error) {
        console.log(error.message);
    }
}

export const oauth = (formData, history) => async (dispatch) => {

    console.log('oauth action' + formData);
    try {

        const { data } = await api.oauth(formData);

        dispatch({ type: OAUTH, data })

        history.push('/posts');
        
    } catch (error) {
        
    }
}