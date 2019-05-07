import React, { Component } from "react";

class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth
      };
    }
    updateDimensions() {
        this.setState({width: window.innerWidth});
    }

    getWidth() {
        return this.state.width;
    }
}

let screenExported = new Screen();
export default screenExported;