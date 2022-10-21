import Card from "./card";
import { useContext, useState, useEffect } from "react";

function AllData() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    //fetch all account from API
    fetch('http://localhost:4000/account/all')
      .then(response => response.json())
      .then(data => {
        console.log('data: ',data)
        setUserData(data)
      })
  }, [])

  userData && console.log('userData: ',userData)

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