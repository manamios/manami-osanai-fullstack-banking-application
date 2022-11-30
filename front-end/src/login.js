import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";
import Card from "./card"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/");
      console.log(user)
    }, [user, loading]);

    function onLogin(email, password, e){
      logInWithEmailAndPassword(email, password, e).then(() => {
        navigate("/")
      })
    }

    function onGoogleLogin(){
      signInWithGoogle()
      .then(() => {
        navigate("/")
      })
    }

    return (
        <Card 
        bgcolor="secondary"
        header="Login"
        // status={status}
        body={(
            <form>
                Email Adress<br/>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <br/>
              Password<br/>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <br/>
              <button
                className="btn btn-light"
                onClick={(e) => onLogin(email, password, e)}
              >
                Login
              </button>
              <br/>
              <br/>
              <button type="button" className="btn btn-light login__google" onClick={onGoogleLogin}>
                Login with Google
              </button>
              <div>
                Don't have an account? <br/><Link to="/CreateAccount">Register</Link> now.
              </div>
            </form>
        )}
        ></Card>
    );
}
export default Login;