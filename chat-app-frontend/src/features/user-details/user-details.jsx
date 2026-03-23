import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./user-details-slice";
import styles from "./user-details.module.css";

export default function UserDetails() {

    const { userId, username, email, status } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        dispatch(getUserDetails());
    }, []);

    // close on outside click
    useEffect(() => {
        const handleClickOutside = () => setShowDetails(false);
        if (showDetails) {
            window.addEventListener("click", handleClickOutside);
        }
        return () => window.removeEventListener("click", handleClickOutside);
    }, [showDetails]);

    return (
        <div className={styles.container}>

            {/* 👤 Avatar */}
            <div
                className={styles.avatar}
                onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(prev => !prev);
                }}
            >
                {username ? username[0].toUpperCase() : "U"}
            </div>

            {/* 📋 Dropdown */}
            {showDetails && (
                <div className={styles.dropdown}>
                    <p className={styles.text}>
                        <span className={styles.label}>ID:</span> {userId}
                    </p>
                    <p className={styles.text}>
                        <span className={styles.label}>Name:</span> {username}
                    </p>
                    <p className={styles.text}>
                        <span className={styles.label}>Email:</span> {email}
                    </p>

                    <button className={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}