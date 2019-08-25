import React, { Component } from "react";
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, Tooltip } from "reactstrap";
import { iconsArray } from "variables/Variables.jsx";
import AdsImage from "../../assets/img/ads.jpg";
import MercadoLivre from "../../assets/img/ml_white.png";
import Americanas from "../../assets/img/americanas.jpg";
import "material-design-icons-iconfont";
import MarketplaceAdsStatus from "components/MarketplaceAdsStatus/MarketplaceAdsStatus";

const buttons_ads = [
  {
    icon_name: 'info',
    color: '#FFBB33',
    placement: 'left',
    name: 'Informações'
  },
  {
    icon_name: 'edit',
    color: '#00C851',
    placement: 'top',
    name: 'Editar'
  },
  {
    icon_name: 'delete',
    color: '#FF4444',
    placement: 'right',
    name: 'Excluir'
  }
]

class Ads extends Component {
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={14}>
                  <Row>
                    {iconsArray.map((prop, key) => {
                      let card_key = key;
                      return (
                        <Col
                          md={4}
                          className="font-icon-list"
                          key={key}
                        >
                          <Card className="card-ads">
                            <div style={{ position: "relative", width: "100%" }}>
                              <CardImg top src={AdsImage} alt="Card image cap"/>
                                <div className="ads_card_options"/>
                                <div className="ads_card_options_buttons">
                                  {buttons_ads.map((prop, key) => {
                                    let prop_tooltip_id = "tooltip_"+prop.icon_name+"_"+key+"_"+card_key;
                                    return (
                                      <ImgLink id={prop_tooltip_id} placement={prop.placement} color={prop.color} icon_name={prop.icon_name} name={prop.name}/>
                                    );
                                  })}
                                </div>
                              </div>
                            <CardBody>
                              <CardTitle className="card-ads-title">Card title</CardTitle>
                              {/*<CardSubtitle>Card subtitle</CardSubtitle>*/}
                              <CardText className="card-ads-text">Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                              <div>
                                <Row style={{ float:"right", margin:"0", padding:"0" }}>
                                  <Col style={{ padding:"2" }}>
                                    <MarketplaceAdsStatus id={"ads_status_1_"+card_key} marketplaceName={"Mercado Livre"} avatar={MercadoLivre} status="success"/>
                                  </Col>
                                  <Col style={{ padding:"2" }}>
                                    <MarketplaceAdsStatus id={"ads_status_2_"+card_key} marketplaceName={"Americanas"} avatar={Americanas} status="warning"/>
                                  </Col>
                                </Row>  
                            </div>
                            </CardBody>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const tooltip_style = {
  backgroundColor: "#212121"
}

class ImgLink extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <div>
        <i class="material-icons" id={this.props.id} style={{ color: this.props.color }}>{this.props.icon_name}</i>
          <Tooltip placement={this.props.placement} style={tooltip_style} isOpen={this.state.tooltipOpen} target={this.props.id} toggle={this.toggle}>
            {this.props.name}
          </Tooltip>
      </div>
    )
  }
}

export default Ads;
