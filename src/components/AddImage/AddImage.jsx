import React, { Component } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

const button_style = {
  backgroundColor: "transparent",
  backgroundRepeat:"no-repeat",
  border: "none",
  cursor:"pointer",
  overflow: "hidden",
  outline:"none",
  padding:0, 
  margin:0, 
  borderRadius:"100%"
}

export class MarketplaceAdsStatus extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>      

      </div>
    );
  }
}

export default MarketplaceAdsStatus;