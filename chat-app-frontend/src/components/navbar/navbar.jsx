import { Link } from "react-router-dom"
import styles from './navbar.module.css';

export default function Navbar(){
    return (
        <nav className={styles.navbar}>
            <Link to={'/'}>home</Link>
            <Link to={'/login'}>login</Link>
            <Link to={'/signup'}>signup</Link>
            <Link to={'/rooms'}>rooms</Link>
        </nav>
    )
}