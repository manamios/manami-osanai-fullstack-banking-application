import Card from "./card";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function AllData() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    //fetch all account from API
    fetch('http://localhost:4000/account/all')
      .then(response => response.json())
      .then(data => {
        setUserData(data)
      })
  }, [])

  let allUserDataCards = userData ? userData.map((user, i) => (
    <div key={user.name + i} className="col">
      <Card
        txtcolor="black"
        header={i + 1}
        title={user.name}
        body={
          <>
            <p>E-mail: {user.email}</p>
            <p> Password: {user.password}</p>
          </>
        }
      />
    </div>
  )) : <h1>...Loading</h1>;
  
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">{allUserDataCards}</div>
  );
}

export default AllData