import {Link} from "react-router-dom"
import { logout, auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth";



function NavBar(){
  const [user] = useAuthState(auth);

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">BadBank</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="Deposit">Deposit</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Withdraw">Withdraw</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="AllData">AllData</Link>
          </li>
          { !user ? (<>   
            <li className="nav-item">
              <Link className="nav-link" to="login">Login</Link>
            </li>          
            <li className="nav-item">
              <Link className="nav-link" to="/CreateAccount">Create Account</Link>
            </li>
            </>) 
          : 
            <li className="nav-item">
              <Link className="nav-link" onClick={logout}>Logout</Link>
            </li>      
          }
        </ul>
        {user && <li className="navbar-text ml-auto">Hello, {user.displayName ? user.displayName : user.email}</li>}
      </div>
    </nav>
    </>
  );
}

export default NavBar