import { useEffect, useState } from "react";
import Card from "./card";
import { auth, incrementBalance } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Deposit({userData, setUserData}){
  const [balance, setBalance]                     = useState(userData.balance);
  const [depositAmount, setDepositAmount]         = useState('');
  const [status, setStatus]                       = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    setBalance(userData.balance)
  }, [userData])
  
  
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
    const newUserData = {...userData, "balance": newBalance}
    setUserData(newUserData)
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
