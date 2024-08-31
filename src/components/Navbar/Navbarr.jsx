import React from 'react'
import './Navbar.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {  Link, useNavigate } from 'react-router-dom';
import apiClient from '../../shared/apiClient';

function Navbarr() {
    const navigate = useNavigate();
    const handleSignout=()=>{

        sessionStorage.removeItem("auth_token");
        navigate('/login')
    }
    return (
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-cont">
            <Container>
                <Navbar.Brand href="#">Currency Converter</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/history">History</Nav.Link>
                    </Nav>
                    <Nav>
                        {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                        <Nav.Link eventKey={2} onClick={handleSignout}>
                            Sign Out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbarr