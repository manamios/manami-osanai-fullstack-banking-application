import {Link, Navigate, useNavigate} from "react-router-dom"
import { logout, auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavBar(){
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  function onLogout() {
    logout().then(() => {
      navigate("/login")
    }
    ) 
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">Baby Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user && (<>
            <Nav.Link as={Link} to="deposit">Deposit</Nav.Link>
            <Nav.Link as={Link} to="withdraw">Withdraw</Nav.Link>
            </>)}
            { !user ? (<>
            <Nav.Link as={Link} to="login">Login</Nav.Link>
            <Nav.Link as={Link} to="createAccount">Create Account</Nav.Link>
              </>)
              :
              <Nav.Link as={Link} onClick={onLogout}>Logout</Nav.Link>
            }
          </Nav>
          {user &&
            <Navbar.Text className="justify-content-end ml-auto">Hello, {user.displayName ? user.displayName : user.email}</Navbar.Text>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar