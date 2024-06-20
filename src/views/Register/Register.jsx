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
    if (!form.firstName) {
      alert("First name is required");
      return;
    }

    if (!form.lastName) {
      alert("Last name is required");
      return;
    }

    if (!form.username) {
      alert("Username is required");
      return;
    }

    if (!form.email) {
      alert("Email is required");
      return;
    }

    if (!form.password) {
      alert("Password is required");
      return;
    }

    if (!isValidPhoneNumber(form.phoneNumber)) {
      alert("Phone number must be valid phone number with 10 digits!");
      return;
    }

    if (!isValidEmail(form.email)) {
      alert("Please enter a valid email address!");
    }

    if (
      form.username.length < MIN_USERNAME_LENGTH ||
      form.username.length > MAX_USERNAME_LENGTH
    ) {
      alert(
        "Username must be between 3 and 30 characters and contain only letters and numbers!"
      );
      return;
    }

    if (!isValidPassword(form.password)) {
      alert(
        "Password must be between 8 and 30 characters and must include at least one number and one symbol!"
      );
      return;
    }

    if (!isValidName(form.firstName)) {
      alert(
        "First name must be between 1 and 30 characters and contain only letters!"
      );
      return;
    }

    if (!isValidName(form.lastName)) {
      alert(
        "Last name must be between 1 and 30 characters and contain only letters!"
      );
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
        alert("Email has already been used!");
      } else if (error.code === "auth/weak-password") {
        console.error(
          "Password must be between 8 and 30 characters and must include at least one number and one symbol!"
        );
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address!");
      } else if (error.code === "auth/invalid-credential") {
        alert("Please enter valid credentials!");
      } else if (error.code === "auth/too-many-requests") {
        alert(
          "You have made too many requests for this account. Please try again later."
        );
      } else {
        console.error(`${error.message}`);
        alert(
          `${"Username must be between 3 and 30 characters and contain only letters and numbers!"}`
        );
      }
    }

  };

  return (<div>
    <div className={styles.container}>
      <div className={styles.containerDarker}>
        <div className={styles.text}>
          <h1>Register</h1>
          <form className={styles.registerForm}>
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
              <label htmlFor="password">Password:</label>
              <input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" />
            </div>
            <Button className={styles.button} onClick={register}>Register</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
)
}