import React, { Component } from 'react';
import Add from '../../assets/img/icons/add_image.png';
import AddHover from '../../assets/img/icons/add_image_hover.png';

export class ImageSelecion extends Component {
    constructor(props) {
        super(props);

        this.hover = this.hover.bind(this);
        this.out = this.out.bind(this);
        this.state = {
            iconAdd: Add,
            mouseHover: false
        };
    }

    hover() {
        this.setState({ iconAdd: AddHover });
    }
    out() {
        this.setState({ iconAdd: Add });
    }

    render() {
        return (
            <div className="image-selection">
                <img src={this.props.src} alt={this.props.alt} />
            </div>
        );
    }
}

export default ImageSelecion;