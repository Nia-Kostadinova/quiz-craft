import { useContext, useEffect, useState } from "react"
import Button from "../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { loginUser } from "../../services/auth.service";
import './Login.css'

export default function Login() {
    const { user, setAppState } = useContext(AppContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            navigate(location.state?.from.pathname || '/');
        }
    }, [user]);

    const login = async() => {
        const { user } = await loginUser(form.email, form.password);
        setAppState({ user, userData: null });
        navigate(location.state?.from.pathname || '/');
    };

    const updateForm = prop => e => {
        setForm({
          ...form,
          [prop]: e.target.value,
        });
      };

  return (
    <div className="login">
      <div className='login-darker'>
        <div className="text">
          <h1>Login</h1>
          <div className="table">
            <div className="labels">
              <label htmlFor="email">Email: </label>
              <label htmlFor="password">Password: </label>
            </div>
            <div className="login-inputs">
              <input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br/>
              <input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" />
            </div>
          </div>
          <br/><br/>
          <Button className="button" onClick={login}>Login</Button>
          </div>
        </div>
      </div>
    )
}
