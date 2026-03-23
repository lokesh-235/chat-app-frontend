import { useEffect, useState } from "react";
import styles from './toggle-button.module.css';

export default function ToggleButton() {

    const [darkMode, setDarkMode] = useState(false);

    // load saved theme
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            setDarkMode(true);
            document.body.classList.add("dark");
        }
    }, []);

    // toggle theme
    const handleToggle = () => {
        setDarkMode(prev => {
            const newMode = !prev;

            if (newMode) {
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }

            return newMode;
        });
    };

    return (
        <label className={styles.themeSwitch}>
            <input
                type="checkbox"
                className={styles.themeSwitch__checkbox}
                checked={darkMode}
                onChange={handleToggle}
            />

            <div className={styles.themeSwitch__container}>
                
                <div className={styles.themeSwitch__clouds}></div>

                <div className={styles.themeSwitch__starsContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727..."
                            fill="currentColor"
                        />
                    </svg>
                </div>

                <div className={styles.themeSwitch__circleContainer}>
                    <div className={styles.themeSwitch__sunMoonContainer}>
                        <div className={styles.themeSwitch__moon}>
                            <div className={styles.themeSwitch__spot}></div>
                            <div className={styles.themeSwitch__spot}></div>
                            <div className={styles.themeSwitch__spot}></div>
                        </div>
                    </div>
                </div>

            </div>
        </label>
    );
}