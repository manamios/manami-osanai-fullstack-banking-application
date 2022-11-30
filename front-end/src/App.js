// import createContext from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import NavBar from './navbar'
import Home from './home'
import CreateAccount from './createaccount'
import Deposit from './deposit'
import Withdraw from './withdraw'
import AllData from './alldata'
import Login from './login';
import { auth, getUserData } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from 'react';

function App() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = user && await getUserData(user)
      setUserData(data)  
    }  
    fetchData()
  }, [user])
  

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <div className="container" style={{padding: "20px"}}>
          <Routes>
            {!user ? 
              <>
              <Route path="/login" exact element={<Login />} />
              <Route path="/CreateAccount/" element={<CreateAccount />} />
              </>
              :
              <>
              <Route path="/" exact element={user && userData && <Home userData={userData} /> } />
              <Route path="/deposit/" element={userData && <Deposit setUserData={setUserData} userData={userData} />} />
              <Route path="/withdraw/" element={userData && <Withdraw setUserData={setUserData} userData={userData}/>} />
              <Route path="/alldata/" element={<AllData />} />
              {/* <Route path="/*" element={<Navigate replace to="/"/>} /> */}
              </>
            }
          </Routes>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
