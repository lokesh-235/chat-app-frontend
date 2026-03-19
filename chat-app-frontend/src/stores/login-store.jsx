import { createStore } from "redux";

const userDetails = {
    email : '',
    password : ''
}

function loginReducer(state=userDetails,action){
    switch(action.type){
        case 'CHANGE_EMAIL' : return {...state,email : action.payload};

        case 'CHANGE_PASSWORD' : return {...state,password : action.payload};

        default : return state;
    }
}


export const loginStore = createStore(loginReducer);