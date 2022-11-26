import React, { useEffect } from "react";
import Card from "./card";
import { auth, getUserData, incrementBalance } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Deposit(){
  const [balance, setBalance]                     = React.useState(0);
  const [depositAmount, setDepositAmount]         = React.useState('');
  const [status, setStatus]                       = React.useState('');
  const [user] = useAuthState(auth);
  
  function depositMoney() {
    
    if (!depositAmount) {
      setStatus('Enter deposit amount')
      setTimeout(() => setStatus(''),3000);
      return
    }

    if (isNaN(parseInt(depositAmount))) {
      setStatus('Enter a number')
      setDepositAmount('')
      setTimeout(() => setStatus(''),3000);
      return
    }

    if (depositAmount < 0) {
      setStatus('Enter a positive number')
      setDepositAmount('')
      setTimeout(() => setStatus(''),3000);
      return
    }

    let newBalance = balance + parseInt(depositAmount)
    

    incrementBalance(user, depositAmount)
    setBalance(newBalance)
    setStatus(`Success! your new balance is $${newBalance}`)
    setDepositAmount('')
    setTimeout(() => setStatus(''),3000);
  }

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      status={status}
      body={  
              <>
              <h3>{`Balance: $${balance}`}</h3><hr/>
              <h3>Deposit Amount</h3>
              <input type="input" className="form-control" id="deposit" placeholder="Enter deposit amount" value={depositAmount} onChange={e => setDepositAmount(e.target.value)}/><br/>
              <button disabled={!depositAmount} type="submit" className="btn btn-light" onClick={depositMoney}>Deposit</button>
              </>
            }
    />
  )
}

export default Deposit
