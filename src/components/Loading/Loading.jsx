import React, { Component } from 'react';
import { Spinner } from "reactstrap";

let width = window.innerWidth;
let height = window.innerHeight;

const styleDivLoading = {
    zIndex: '1000',
    backgroundColor: 'white',
    position: 'absolute',
    top: '0',
    width: width + 'px',
    height: height + 'px'
}

const styleLoading = {
    display: 'block',
    marginTop: '48%',
    opacity: '0.6',
    marginLeft: 'auto',
    marginRight: 'auto'
}

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styleDivLoading}>
                <Spinner color="primary" style={styleLoading} />
            </div>
        );
    }
}

export default Loading;