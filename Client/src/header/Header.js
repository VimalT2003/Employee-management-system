import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./Header.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserPlus, faUsers, faUsersRectangle } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    return (
        <>
            <Navbar bg="primary" cariant="dark">
                <Container>
                    <Navbar.Brand to="/">
                        <strong><FontAwesomeIcon style={{fontSize:"23px"}} icon={faUsersRectangle} /> Employee Management System</strong>
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className='nav-link' style={{fontSize:"23px"}}>
                        <FontAwesomeIcon  icon={faUsers} /> Employee</Nav.Link>
                        <Nav.Link as={Link} to="/employee" className='nav-link' style={{fontSize:"23px"}}>
                        <FontAwesomeIcon  icon={faUserPlus} /> Add Employee</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
