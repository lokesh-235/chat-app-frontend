import { useSelector, useDispatch } from "react-redux";
import { changeUsername, changeEmail, changePassword, signupUser } 
from "./signupSlice";
import Navbar from "../../components/navbar/navbar";
import styles from './signup.module.css';

export default function Signup() {

    const state = useSelector((state) => state.signup);
    const dispatch = useDispatch();

    const SubmitSignupForm = (e) => {
        console.log('clciked');
    e.preventDefault();
    const data = dispatch(signupUser(state));
    console.log(data);
    };

    return (
    <>
    <Navbar />

    <div className={styles.container}>
        <form onSubmit={SubmitSignupForm} className={styles.form}>
            
            <h1 className={styles.title}>Signup</h1>

            <input
                className={styles.input}
                value={state.username}
                onChange={(e) => dispatch(changeUsername(e.target.value))}
                placeholder="Username"
            />

            <input
                className={styles.input}
                value={state.email}
                onChange={(e) => dispatch(changeEmail(e.target.value))}
                placeholder="Email"
            />

            <input
                className={styles.input}
                type="password"
                value={state.password}
                onChange={(e) => dispatch(changePassword(e.target.value))}
                placeholder="Password"
            />

            <button className={styles.button}>Signup</button>
        </form>
    </div>
</>
    );
}