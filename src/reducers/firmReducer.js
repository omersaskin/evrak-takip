import {FIRM_LIST,FIRM_LIST_COUNT} from '../types'

const initialState = {
    firmList:[],
    firmListCount:0,
    loading:true
}

export default function usersReducer(state = initialState, action){
    switch(action.type){
        case FIRM_LIST:
            return {
                ...state,
                firmList: action.payload,
                loading: false
            };
        case FIRM_LIST_COUNT:
            return {
                ...state,
                firmListCount: action.payload
            };
        default:
            return state;
    }
}
