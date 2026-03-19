import { useSelector, useDispatch } from "react-redux";
import { changeUsername, changeEmail, changePassword, signupUser } 
from "./signupSlice";
import Navbar from "../../components/navbar/navbar";


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
        <Navbar/>
        
        <form onSubmit={SubmitSignupForm}>
            
            <h1>Signup Form</h1>
            <input
                value={state.username}
                onChange={(e) => dispatch(changeUsername(e.target.value))}
                placeholder="username"
            />

            <input
                value={state.email}
                onChange={(e) => dispatch(changeEmail(e.target.value))}
                placeholder="email"
            />

            <input
                value={state.password}
                onChange={(e) => dispatch(changePassword(e.target.value))}
                placeholder="password"
            />

            <button>submit</button>
        </form>
    </>
    );
}