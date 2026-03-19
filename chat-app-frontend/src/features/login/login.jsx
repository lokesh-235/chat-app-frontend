import { useEffect, useState } from "react";

import { loginStore } from "../../stores/login-store";
import { authAPI } from "../../apis/api";
import Navbar from "../../components/navbar/navbar";


export default function Login() {

    const [userData, setUserData] = useState(loginStore.getState());
    const [loginStatus,setLoginStatus] = useState('');

    useEffect(() => {
        const unsubscribe = loginStore.subscribe(() => {
            setUserData(loginStore.getState());
        });

        return () => unsubscribe();
    }, []);

    const SubmitLoginForm = async (e) => {
        e.preventDefault();
        console.log(userData);
        const res = await authAPI(userData);

        try{
            console.log(res.data);

        setLoginStatus(res.data);
        }catch(e){
            console.error(e);
        }
        
    };

    return (
        <>
             <Navbar/>

            <form onSubmit={SubmitLoginForm}>
                <h1>Login Form</h1>
                <input
                    onChange={(e) => {
                        loginStore.dispatch({
                            type: 'CHANGE_EMAIL',
                            payload: e.target.value
                        });
                    }}
                    type="email"
                    placeholder="email"
                    value={userData.email}
                />

                <input
                    onChange={(e) => {
                        loginStore.dispatch({
                            type: 'CHANGE_PASSWORD',
                            payload: e.target.value
                        });
                    }}
                    type="password"
                    placeholder="password"
                    value={userData.password}
                />

                <a href="http://localhost:8080/oauth2/authorization/google">google</a>

                <button>login</button>

                <p>{loginStatus}</p>
            </form>
        </>
    );
}