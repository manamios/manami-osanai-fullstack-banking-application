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
import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth";

// const UserContext = createContext(null);

function App() {
  const [user] = useAuthState(auth);
  // const navigate = useNavigate();

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
            <Route path="/deposit/" element={<Deposit />} />
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
