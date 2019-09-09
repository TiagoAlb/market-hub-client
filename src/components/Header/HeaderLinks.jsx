import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";
import loginService from '../../services/LoginService.jsx';

class HeaderLinks extends Component {
  render() {
    return (
      <div style={{paddingRight: "20px", paddingLeft: "20px"}}>
        <Nav>
          <NavItem eventKey={3} href="/" className="logout" onClick={() => loginService.closeSession()}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default HeaderLinks;
