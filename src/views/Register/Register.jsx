import { useContext, useState, useEffect } from "react"
import { registerUser } from "../../services/auth.service";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByUsername } from "../../services/users.service";
import styles from './Register.module.css';
import { roles } from "../../common/constants";
import Button from "../../components/Button/Button";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  isValidName,
} from "../../common/constants";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    role: "student",
    isAdmin: false,
    code: "",
  });

  const { user, setAppState } = useContext(AppContext);
  const [selectedRole, setSelectedRole] = useState(roles[1]);
  const [registerError, setRegisterError] = useState('');
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username) {
      setRegisterError("Username is required");
      return;
    } else if (form.username.length < MIN_USERNAME_LENGTH || form.username.length > MAX_USERNAME_LENGTH) {
      setRegisterError("Username must be between 3 and 30 characters and contain only letters and numbers!");
      return;
    }

    if (!form.firstName) {
      setRegisterError("First name is required");
      return;
    } else if (!isValidName(form.firstName)) {
      setRegisterError("First name must be between 1 and 30 characters and contain only letters!");
      return;
    }

    if (!form.lastName) {
      setRegisterError("Last name is required");
      return;
    } else if (!isValidName(form.lastName)) {
      setRegisterError("Last name must be between 1 and 30 characters and contain only letters!");
      return;
    }

    if (!form.email) {
      setRegisterError("Email is required");
      return;
    } else if (!isValidEmail(form.email)) {
      setRegisterError("Please enter a valid email address!");
      return;
    }

    if (!isValidPhoneNumber(form.phoneNumber)) {
      setRegisterError("Phone number must be a valid phone number with 10 digits!");
      return;
    }

    if (!form.password) {
      setRegisterError("Password is required");
      return;
    } else if (!isValidPassword(form.password)) {
      setRegisterError("Password must be between 8 and 30 characters and must include at least one number and one symbol!");
      return;
    }


    try {

      const snapshot = await getUserByUsername(form.username);
      if (snapshot?.exists()) {
        alert("Username already exists!");
        return;
      }

      const credential = await registerUser(form.email, form.password);
      await createUser(
        form.username,
        credential.user.uid,
        credential.user.email,
        form.phoneNumber,
        form.firstName,
        form.lastName
      );
      await updateProfile(auth.currentUser, { displayName: form.username });
      setAppState({ user: credential.user, userData: null });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setRegisterError("Email has already been used!");
      } else if (error.code === "auth/weak-password") {
        setRegisterError("Password must be between 8 and 30 characters and must include at least one number and one symbol!");
      } else if (error.code === "auth/invalid-email") {
        setRegisterError("Please enter a valid email address!");
      } else if (error.code === "auth/invalid-credential") {
        setRegisterError("Please enter valid credentials!");
      } else if (error.code === "auth/too-many-requests") {
        setRegisterError("You have made too many requests for this account. Please try again later.");
      } else {
        setRegisterError(error.message);
      }
      }
    }


  return (<div>
    <div className={styles.container}>
      <div className={styles.containerDarker}>
        <div className={styles.text}>
          <h1>Register</h1>
          <form className={styles.registerForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username:</label>
              <input value={form.username} onChange={updateForm('username')} type="text" name="username" id="username" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First name:</label>
              <input value={form.firstName} onChange={updateForm('firstName')} type="text" name="firstName" id="firstName" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last name:</label>
              <input value={form.lastName} onChange={updateForm('lastName')} type="text" name="lastName" id="lastName" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Phone number:</label>
              <input value={form.phoneNumber} onChange={updateForm('phoneNumber')} type="text" name="phoneNumber" id="phoneNumber" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" />
            </div>
            <Button className={styles.button} type="submit" onClick={handleSubmit}>Register</Button>
            {registerError && <p className={styles.error}>{registerError}</p>}
          </form>
        </div>
      </div>
    </div>
  </div>
)
}