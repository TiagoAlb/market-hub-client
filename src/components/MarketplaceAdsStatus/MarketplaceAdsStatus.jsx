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
    let statusColor="#E0E0E0";
    if(this.props.status!=null) {
      if(this.props.status==="success")
        statusColor="#00C851";
      else if(this.props.status==="warning")
        statusColor="#FFBB33";
      else if(this.props.status==="info")
        statusColor="#33B5E5";
      else if(this.props.status==="danger")
        statusColor="#FF4444";
    }
    
    return (
      <div>      
        <Button id={this.props.id} onMouseOver={this.toggle} onMouseOut={this.toggle} className="btn-link" style={button_style} type="button">
          <div className="ads_status" style={{ borderColor:statusColor }}>
            <img src={this.props.avatar}/>
          </div>
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.props.id}>
          <PopoverHeader style={{ backgroundColor:statusColor, marginTop:6, color:"white" }}>{this.props.marketplaceName}</PopoverHeader>
          <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default MarketplaceAdsStatus;