import React, { useEffect } from "react";
import Card from "./card";
import { auth, incrementBalance } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Withdraw({userData, setUserData}){
  const [balance, setBalance]                     = React.useState(userData.balance);
  const [withdrawAmount, setWithdrawAmount]         = React.useState('');
  const [status, setStatus]                       = React.useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    userData && setBalance(userData.balance)
  }, [userData])
  
  function withdrawMoney() {
    if (!withdrawAmount) {
      setStatus('Enter withdraw amount')
      setTimeout(() => setStatus(''),3000);
      return
    }

    if (isNaN(parseInt(withdrawAmount))) {
      setStatus('Enter a number')
      setWithdrawAmount('')
      setTimeout(() => setStatus(''),3000);
      return
    }

    if (withdrawAmount < 0) {
      setStatus('Enter a positive number')
      setWithdrawAmount('')
      setTimeout(() => setStatus(''),3000);
      return
    }

    if (withdrawAmount > balance) {
      setStatus('It is more than you have')
      setWithdrawAmount('')
      setTimeout(() => setStatus(''),3000);
      return
    }

    let newBalance = balance - parseInt(withdrawAmount)

    incrementBalance(user, -withdrawAmount)
    setBalance(newBalance)
    const newUserData = {...userData, "balance": newBalance}
    setUserData(newUserData)
    setStatus(`Success! your new balance is $${newBalance}`)
    setWithdrawAmount('')
    setTimeout(() => setStatus(''),3000);
  }

  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={  
              <>
              <h3>{`Balance: $${balance}`}</h3><hr/>
              <h3>Withdraw Amount</h3>
              <input type="input" className="form-control" id="deposit" placeholder="Enter withdraw amount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)}/><br/>
              <button disabled={!withdrawAmount} type="submit" className="btn btn-light" onClick={withdrawMoney}>Withdraw</button>
              </>
            }
    />
  )
}

export default Withdraw