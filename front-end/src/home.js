import Card from "./card";
import babyhand from "./babyhand.jpg"

function Home({userData}){
  return (
    <Card
      txtcolor="black"
      header="Home"
      title="Welcome to the bank"
      text="Practice Deposit and Withdraw."
      body={(<>
        <h4>{`Current Balance: $${userData.balance}`}</h4><hr/>
        <img src={babyhand} className="img-fluid" alt="Responsive image"/>
        </>)}
    />    
  );  
}

export default Home