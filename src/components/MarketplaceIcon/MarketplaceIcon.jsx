import React, { Component } from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";

const button_style = {
  backgroundColor: "transparent",
  backgroundRepeat: "no-repeat",
  border: "none",
  cursor: "pointer",
  overflow: "hidden",
  outline: "none",
  padding: 0,
  margin: 0,
  borderRadius: "100%"
}

class MarketplaceIcon extends Component {
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

  onClickCall = () => {
    this.props.onClickCall(this.props.id);
  }

  render() {
    let statusColor = '#E0E0E0';
    if (this.props.status) {
      if (this.props.status === 'success')
        statusColor = '#00C851';
      else if (this.props.status === 'warning')
        statusColor = '#FFBB33';
      else if (this.props.status === 'info')
        statusColor = '#33B5E5';
      else if (this.props.status === 'danger')
        statusColor = '#FF4444';
      else if (this.props.status === 'selected')
        statusColor = '#3472F7';
    }

    let tam = '38px';

    if (this.props.tam) {
      tam = this.props.tam;
    }

    return (
      <div>
        <Button id={this.props.idItem} onClick={() => this.props.onClickCall ? this.onClickCall() : ''}
          onMouseOver={this.props.popover ? this.toggle : ''}
          onMouseOut={this.props.popover ? this.toggle : ''}
          className="btn-link" style={button_style} type="button">
          <div className="marketplace_icon" style={{ borderColor: statusColor, width: tam, height: tam }}>
            <div id="icon_line">
              <img alt="auto" src={this.props.avatar} />
            </div>
          </div>
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.props.idItem}>
          <PopoverHeader style={{ backgroundColor: statusColor, marginTop: 6, color: "white" }}>{this.props.marketplaceName}</PopoverHeader>
          <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default MarketplaceIcon;