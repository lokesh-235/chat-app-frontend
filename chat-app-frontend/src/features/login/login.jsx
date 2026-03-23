import { useEffect, useState } from "react";

import { loginStore } from "../../stores/login-store";
import { authAPI } from "../../apis/api";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../user-details/user-details-slice";
import styles from './login.module.css';

export default function Login() {

    const [userData, setUserData] = useState(loginStore.getState());
    const [loginStatus,setLoginStatus] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

        dispatch(getUserDetails());

        navigate('/rooms');
        
        }catch(e){
            console.error(e);
        }
        
    };

    return (
        <>
    <Navbar />

    <div className={styles.container}>
        <form onSubmit={SubmitLoginForm} className={styles.form}>
            <h1 className={styles.title}>Login</h1>

            <input
                className={styles.input}
                onChange={(e) => {
                    loginStore.dispatch({
                        type: 'CHANGE_EMAIL',
                        payload: e.target.value
                    });
                }}
                type="email"
                placeholder="Email"
                value={userData.email}
            />

            <input
                className={styles.input}
                onChange={(e) => {
                    loginStore.dispatch({
                        type: 'CHANGE_PASSWORD',
                        payload: e.target.value
                    });
                }}
                type="password"
                placeholder="Password"
                value={userData.password}
            />

            <a 
                className={styles.google}
                href="http://10.48.46.99:8080/oauth2/authorization/google"
            >
                Continue with Google
            </a>

            <button className={styles.button}>Login</button>

            <p className={styles.status}>{loginStatus}</p>
        </form>
    </div>
</>
    );
}