import LandingPage from './views/LandingPage/LandingPage';
import './App.css';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { getUserData } from './services/users.service.js';
import {useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext.jsx';
import Header from './components/Header/Header.jsx';
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';
import Authenticated from './hoc/Authenticated.jsx';
import CreateQuiz from './views/CreateQuiz.jsx';
import NotFound from './views/NotFound.jsx';

function App() {

  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });
  const [user] = useAuthState(auth);
  
  if (appState.user !== user) {
    setAppState({ ...appState, user });
  }
  
  useEffect(() => {
    if (!appState.user) return;
  
    getUserData(appState.user.uid)
      .then(snapshot => {
        const userData = Object.values(snapshot.val())[0];
        setAppState({...appState, userData});
      });
  }, [appState.user])

  return (
    <>
      <AppContext.Provider value={{...appState, setAppState}}>
        <BrowserRouter>
            <Header/>
              <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/create-quiz" element={<Authenticated><CreateQuiz/></Authenticated>}/>
                <Route path="*" element={<NotFound />}/>
              </Routes>
            <Footer/>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App
