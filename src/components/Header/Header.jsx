import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { logoutUser } from "../../services/auth.service";
import './Header.css';

export default function Header () {
    const { user, userData, setAppState } = useContext(AppContext);

    const logout = async() => {
        await logoutUser();
        setAppState({ user: null, userData: null})
    };

    return (
        <header className="header">
            <div className="navigation">
                <NavLink to="/">Home</NavLink>
                {user && <NavLink to="/tweets">All tweets</NavLink>}
                {user && <NavLink to="/tweets-create">Create tweet</NavLink>}
            </div>
            { user 
            ? (
                <>
                    {`Welcome, ${userData ? userData.handle : 'Loading'}`}
                    <Button onClick={logout}>LogOut</Button>
                </>
            )
            : <div className="login-register">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </div>}
        </header>
    )
}
