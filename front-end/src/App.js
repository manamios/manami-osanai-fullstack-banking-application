// import createContext from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import NavBar from './navbar'
import Home from './home'
import CreateAccount from './createaccount'
import Deposit from './deposit'
import Withdraw from './withdraw'
import AllData from './alldata'
import UserContext from './context';
import Login from './login';
import { auth, getUserData } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from 'react';

// const UserContext = createContext(null);

function App() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null)
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(user)
      setUserData(data)
      console.log(userData)
    }
    fetchData()
    console.log(userData)
  }, [user])
  

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <div className="container" style={{padding: "20px"}}>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/" exact element={user ? <Home /> : <Login />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/deposit/" element={<Deposit userData={userData} />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div>
      </UserContext.Provider>      
    </BrowserRouter>
    </div>
  );
}

export default App;
