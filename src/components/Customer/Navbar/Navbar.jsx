import React from "react";
import { Navbar, Nav ,NavDropdown} from "react-bootstrap";
import {BsPersonCircle} from 'react-icons/bs'
import {  FaEdit, FaSignOutAlt } from "react-icons/fa";
import './Navbar.css';

const NavigationMenu = () => {
  const userEmail = localStorage.getItem('email');
  return (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
      <Navbar.Brand>
        <Nav.Link href="/homepage" id="">Name Boards</Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Item>
            <Nav.Link href="/homepage" id="giftHomeButton">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/cart" id="Cart">Cart</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myorders" id="myOrderButton">My Orders</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
      
          <NavDropdown
                title={
                  <>
                   <BsPersonCircle style={{ fontSize: '25px' }} /> {userEmail} 
                  </>}
                id="nav-dropdown"
              >
              <NavDropdown.Item></NavDropdown.Item>
              <NavDropdown.Item href="/myprofile"><FaEdit />  My Profile</NavDropdown.Item>
              <NavDropdown.Item href="/" id="logout" onClick={() => localStorage.clear()}> <FaSignOutAlt /> Logout</NavDropdown.Item>
       </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationMenu;
