import { Nav, Navbar, Container } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import {logout} from '../actions/auth';
import {Link} from 'react-router-dom';

const NavbarMenu = () => {

  const user = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const handleLogout=(e)=>{
    e.preventDefault();
    dispatch(logout());
  }

  const state = useSelector(state=>state.auth.isAuthenticated);
  
  if(!state || !user.user){
    return (
      <></>
    )
  }

  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand as={Link} to="/">Complaint Management Software</Navbar.Brand>
    <Nav>
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to={user.user.role === "admin"?"/admin":(user.user.role === "mod" ? "/mod": "/dashboard")}>Dashboard</Nav.Link>
      <Nav.Link as={Link} to="#" onClick={handleLogout}>Logout</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  )
}

export default NavbarMenu;