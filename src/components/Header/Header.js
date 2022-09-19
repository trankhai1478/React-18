import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/login')
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">TQK-APP</Navbar.Brand> */}
                <NavLink to='/' className='navbar-brand'>TQK-APP</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>User</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>
                        {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">User</Nav.Link>
                        <Nav.Link href="/admins">Admin</Nav.Link> */}

                    </Nav>
                    <Nav>
                        <button className='btn-login' onClick={() => handleOnClick()}>Đăng nhập</button>
                        <button className='btn-signup' onClick={() => handleRegister()}>Đăng ký</button>
                        {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item >Login</NavDropdown.Item>
                            <NavDropdown.Item >
                                Login out
                            </NavDropdown.Item>
                            <NavDropdown.Item>Profile</NavDropdown.Item>

                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;