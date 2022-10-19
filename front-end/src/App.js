// import createContext from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from './navbar'
import Home from './home'
import CreateAccount from './createaccount'
import Deposit from './deposit'
import Withdraw from './withdraw'
import AllData from './alldata'
import UserContext from './context';

// const UserContext = createContext(null);

function App() {
  console.log("appuserco",UserContext)
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <div className="container" style={{padding: "20px"}}>
          <Routes>
            <Route path="/" exact element={<Home />} />
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
