import { useContext, useState, useEffect } from "react"
import { registerUser } from "../../services/auth.service";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { createUserHandle, getUserByHandle } from "../../services/users.service";
import './Register.css';
import { roles } from "../../constants/constants";
import Button from "../../components/Button/Button";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "student",
    isAdmin: false,
    code: "",
  });

  const { user, setAppState } = useContext(AppContext);
  const [selectedRole, setSelectedRole] = useState(roles[1]);
  const navigate = useNavigate();

  if (user) {
    navigate('/');
  }

  const updateForm = prop => e => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const handleChangeRole = (selected) => {
    setSelectedRole({ ...selected });
  };

  useEffect(() => {
    setForm({ ...form, role: selectedRole.value });
  }, [selectedRole]);


  const register = async() => {
    // TODO: validate form data
    try {
      const user = await getUserByHandle(form.username);
      if (user.exists()) {
        return console.log('User with this username already exists!');
      }
      const credential = await registerUser(form.email, form.password);
      await createUserHandle(form.username, credential.user.uid, credential.user.email);
      setAppState({ user: credential.user, userData: null });
      navigate('/');
    } catch (error) {
      if (error.message.includes('auth/email-already-in-use')) {
        console.log('User has already been registered!');
      }
    }
  };

  return (<div>
    <div className="register">
      <div className='register-darker'>
        <div className="text">
          <h1>Register</h1>
          <div className="table">
            <div className="labels">
              <label htmlFor="username">First name:</label>
              <label htmlFor="username">Last name:</label>
              <label htmlFor="email">Email:</label>
              <label htmlFor="password">Password:</label>
            </div>
            <div className="register-inputs">
              <input value={form.firstName} onChange={updateForm('firstName')} type="text" name="username" id="username" /><br/>
              <input value={form.lastName} onChange={updateForm('lastName')} type="text" name="username" id="username" /><br/>
              <input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br/>
              <input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" />
            </div>
          </div>
            <br /><br />
            <Button className="button" onClick={register}>Register</Button>
        </div>
      </div>
    </div>
  </div>)
}