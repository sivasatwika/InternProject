import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function NavigationMenu() {
  return (
    <Navbar expand="lg" variant="dark" fixed="top" style={{ backgroundColor: "rgb(40,115,115)" ,color:"white"}}>
   
        <Navbar.Brand>
          <Nav.Link href="/Admingifts" id="">
            Name Boards
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Item>
              <Nav.Link href="/admingifts" id="adminGifts">
                Gifts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/adminthemes" id="adminTheme">
                Themes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/adminvieworders" id="adminOrders">
                Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/adminreview" id="adminReviews">
                Reviews
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link
                href="/"
                id="logout"
                onClick={() => localStorage.clear()}
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
    
    </Navbar>
  );
}

export default NavigationMenu;
