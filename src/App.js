import React,{useState,createContext} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration";
import LogIn from "./Components/LogIn";
import HomePage from "./Components/HomePage";
import Crud from "./Components/Crud";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export const AppContext = createContext(null);

const App = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState(
    user ? true : false
  );
  return (
    <>
    <AppContext.Provider
      value={{
        isUserLoggedIn,
        setUserLoggedin,
        user,
        setUser,
        
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/LogIn" element={<LogIn/>}></Route>
          <Route path="/Registration" element={<Registration/>}></Route>
          <Route path="/Crud" element={<Crud/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AppContext.Provider>
    </>
  )
}

export default App