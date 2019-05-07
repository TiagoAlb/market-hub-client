import React, { Component } from "react";
import {Input} from 'reactstrap';

export class InputFile extends Component {
  render() {
    return (
      <div className="input input-file">
        <div class={"fileUpload btn btn-" + this.props.buttonStyle}
            style={{ 
                backgroundColor: this.props.backgroundColor,
                color: this.props.textColor
            }}>
            <Input className="upload" type="file" onChange={this.props.onChange}
                proprieties={[
                {
                    accept: this.props.accept,
                    bsClass: "form-control",
                }
            ]}
            />
            <img src={this.props.image}/>
            <span style={{padding: 'auto' }}>{this.props.text}</span>
        </div>
      </div>
    );
  }
}

export default InputFile;
