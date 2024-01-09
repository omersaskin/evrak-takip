import axios from 'axios'

import {GET_USERS, USERS_ERROR} from '../types'

export const getUsers = () => async dispatch => {
    
    try{
        const res = await axios.get(`http://localhost:8000/api/get_main_companies`)
        dispatch( {
            type: GET_USERS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }

}