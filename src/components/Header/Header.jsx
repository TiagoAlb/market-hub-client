import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import loggedRoutes from "../../routes/loggedRoutes.jsx";
import Screen from "../../Useful/Screen.jsx";
import HeaderLinks from "./HeaderLinks.jsx";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false,
      width: Screen.getWidth()
    };
  }

  componentDidMount() {
    Screen.updateDimensions();
    window.addEventListener("resize", Screen.updateDimensions.bind(this));
  }

  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  getBrand() {
    var name;
    loggedRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  render() {
    return (/*
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#pablo">{this.getBrand()}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <HeaderLinks />
        </Navbar.Collapse>
      </Navbar>*/

      <Navbar color="faded" light>
      <NavbarBrand href="#pablo" className="mr-auto">{this.getBrand()}</NavbarBrand>
      <HeaderLinks/>
        {this.state.width <= 991 ? (<NavbarToggler onClick={this.mobileSidebarToggle} className="mr-2" />) : null}
      </Navbar>
    );
  }
}

export default Header;
