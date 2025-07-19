import { useState, useEffect } from "react";
import { Header , Footer } from './components/index.js';
import { useDispatch, useSelector } from "react-redux";
import { login , logout } from "./store/authSlice.js";
import authservice from "./services/Auth.js";
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=> {
    authservice.getCurrentUser()
    .then((userData) => {
      if (userData){
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  },[])
  

  return !loading? (
    <>
    <div>
      <Header/>
        {/*<Outlet/>*/}
      <Footer/>
    </div>
    </>
  ) : null;
}

export default App
