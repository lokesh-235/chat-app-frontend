import { createStore } from "redux";

const userDetails = {
    username : '',
    email : '',
    password : ''
}

function signupReducer(state=userDetails,action){
    switch(action.type){
        case 'CHANGE_USERNAME' : return {...state,username : action.payload};

        case 'CHANGE_EMAIL' : return {...state,email : action.payload};

        case 'CHANGE_PASSWORD' : return {...state,password : action.payload};

        default : return state;
    }
}


export const signupStore = createStore(signupReducer);