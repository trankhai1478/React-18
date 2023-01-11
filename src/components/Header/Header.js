import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Service/ApiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Languages from './Languages';
const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOnClick = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/login')
    }
    const handleLogOut = async () => {
        let rs = await logout("account.email", account.refresh_token);
        if (rs && rs.EC === 0) {
            //xoa data nguoi dung
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(rs.EM);
        }

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
                        {isAuthenticated === false ?
                            <>

                                <button className='btn-login' onClick={() => handleOnClick()}>Đăng nhập</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Đăng ký</button>
                            </>
                            :

                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item >Login</NavDropdown.Item>

                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>
                                    Login out
                                </NavDropdown.Item>

                            </NavDropdown>
                        }
                        <Languages />

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;