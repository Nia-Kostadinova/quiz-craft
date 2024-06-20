import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { logoutUser } from "../../services/auth.service";
import styles from './Header.module.css'

export default function Header () {
    const { user, setAppState } = useContext(AppContext);

    const logout = async() => {
        await logoutUser();
        setAppState({ user: null, userData: null})
    };

    return (
        <header className={styles.header}>
            <div className={styles.navigation}>
                <NavLink to="/">Home</NavLink>
                {user && <NavLink to="/quizzes">Browse Quizzes</NavLink>}
                {user && <NavLink to="/create-quiz">Create quiz</NavLink>}
            </div>
            { user 
            ? (
                <>
                    <Button onClick={logout} className={styles.button}>LogOut</Button>
                </>
            )
            : <div className={styles.loginRegister}>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </div>}
        </header>
    )
}
