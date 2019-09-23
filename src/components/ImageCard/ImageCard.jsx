import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

export class ImageCard extends Component {
  render() {
    let sizeMobile = 767;
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : " card-image")}>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          <Container fluid>
            <Row>
              <Col md={2}>
                <div className="cardImage">
                  <img
                    alt="Marketplace"
                    src={this.props.avatar}
                  />
                </div>
              </Col>
              <Col md={7}>
                <div className={this.props.width ? (this.props.width <= sizeMobile ? "mobile" : "cardMiddle") : "cardMiddle"}>{this.props.content}</div>
              </Col>
              <Col md={3}>
                <div className={this.props.width ? (this.props.width <= sizeMobile ? "mobile" : "cardButtons") : "cardButtons"}>{this.props.options}</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default ImageCard;
