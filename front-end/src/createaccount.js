import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";

import Card from "./card";


function CreateAccount(){
  
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function validatePassword(password){
      if (!password) {
        setStatus('Error: password must not be empty');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (password.length < 8) {
        setStatus('Error: password must have more than 8 characters');
        setTimeout(() => setStatus(''),3000);
        return false
      }
      return true;
  }

  async function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validatePassword(password)) return;

    registerWithEmailAndPassword(name, email, password);

    const url = `http://localhost:4000/account/create/${name}/${email}/${password}`
    console.log(url)

    var res = await fetch(url)
    var data = await res.json()
    console.log(data)

    setShow(false);
  }    

  function clearForm(){
    // setName('');
    // setEmail('');
    // setPassword('');
    // setShow(true);
    if (user) navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    // if (user) navigate("/");
  }, [user, loading]);

  return (
    <Card 
      bgcolor={show ? "info": "success"}
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button disabled={!name && !password && !email} type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Home</button>
              </>
            )}
    />
  )
}

export default CreateAccount