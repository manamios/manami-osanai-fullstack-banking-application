import Card from "./card";
import babyhand from "./babyhand.jpg"

function Home(){
  return (
    <Card
      txtcolor="black"
      header="Home"
      title="Welcome to the bank"
      text="Practice Deposit and Withdraw without security system."
      body={(<img src={babyhand} className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}

export default Home