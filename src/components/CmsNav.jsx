import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

export const CmsNav = () => {
    const user = useSelector(state => state.user.value)

    return Object.keys(user).length ? <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <Link to="/" className="navbar-brand">Travels</Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Item>
                            <NavLink to="/staffs" className="nav-link">
                                <i className="fa-solid fa-users me-2"></i>Staffs
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                    <Nav className="mb-2 mb-lg-0">
                        <NavDropdown title={<><i className="fa-solid fa-users-circle me-2"></i>Demo user</>}>
                            <Link className="dropdown-item">
                                <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
     </Navbar>: null
    
}