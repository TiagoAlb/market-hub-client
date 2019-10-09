import React, { Component } from 'react';
import Add from '../../assets/img/icons/add_image.png';
import AddHover from '../../assets/img/icons/add_image_hover.png';

export class AddImage extends Component {
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

  _handleImageChange = (e) => {
    this.props._handleImageChange(e);
  }

  render() {
    return (
      <div className="add-image">
        <label title="Adicionar imagem" htmlFor="file-input" onMouseOver={this.hover} onMouseOut={this.out} >
          <img alt="Adicionar imagem" src={this.state.iconAdd} />
        </label>
        <input id="file-input"
          accept="image/jpg, image/jpeg, image/png, image/webp, image/JPG, image/JPEG, image/PNG, image/WEBP"
          type="file" multiple="true"
          onChange={(e) => {
            e.preventDefault();
            this._handleImageChange(e);
          }} />
      </div>
    );
  }
}

export default AddImage;