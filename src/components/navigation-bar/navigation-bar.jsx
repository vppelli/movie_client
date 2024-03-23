import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg = "light" expand = "lg" className = "rounded-2">
            <Container>
                <Navbar.Brand as = { Link } to = "/movies">
                    MOVIEMIKES
                </Navbar.Brand>
                <Navbar.Toggle aria-controls = "basic-navbar-nav" />
                <Navbar.Collapse id = "basic-navbar-nav">
                    <Nav className = "me-auto">
                        {!user && (
                            <>
                                <Nav.Link as = { Link } to = "/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as = { Link } to = "/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as = { Link } to = "/movies">
                                    Movie List
                                </Nav.Link>
                                <Nav.Link as = { Link } to = "/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link as = { Link } to = "/genres">
                                    Genres
                                </Nav.Link>
                                <Nav.Link as = { Link } to = "/directors">
                                    Directors
                                </Nav.Link>
                                <Nav.Link onClick = { onLoggedOut }>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}