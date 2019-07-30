import React, { Component } from "react";
import { Container, Row, Col, Popover, PopoverHeader, PopoverBody, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from "reactstrap";
import CardPage from "components/Card/Card";
import { iconsArray } from "variables/Variables.jsx";
import Ads from "../../assets/img/ads.jpg";
import MercadoLivre from "../../assets/img/ml_white.png";
import Americanas from "../../assets/img/americanas.jpg";
import MarketplaceAdsStatus from "components/MarketplaceAdsStatus/MarketplaceAdsStatus";

class Icons extends Component {
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <CardPage
                title="202 Awesome Stroke Icons"
                plain
                ctAllIcons
                category={
                  <span>
                    Handcrafted by our friends from{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://themes-pixeden.com/font-demos/7-stroke/index.html"
                    >
                      Pixeden
                    </a>
                  </span>
                }
                content={
                  <Row>
                    {iconsArray.map((prop, key) => {
                      return (
                        <Col
                          md={3}
                          className="font-icon-list"
                          key={key}
                        >
                          <Card>
                            <CardImg top width="100%" src={Ads} alt="Card image cap" />
                            <CardBody>
                              <CardTitle>Card title</CardTitle>
                              <CardSubtitle>Card subtitle</CardSubtitle>
                              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                              <div>
                                <Row style={{ float:"right", margin:"0", padding:"0" }}>
                                  <Col style={{ padding:"2" }}>
                                    <MarketplaceAdsStatus id={"teste1"+key} marketplaceName={"Mercado Livre"} avatar={MercadoLivre} status="success"/>
                                  </Col>
                                  <Col style={{ padding:"2" }}>
                                    <MarketplaceAdsStatus id={"teste2"+key} marketplaceName={"Americanas"} avatar={Americanas} status="warning"/>
                                  </Col>
                                </Row>  
                            </div>
                            </CardBody>
                          </Card>
                          {/* <div className="div_ads">
                            <img src={Ads} width="100%" height="auto"/>
                            <input type="text" defaultValue={"Anuncio Teste"} />
                            <input type="text" defaultValue={"Descrição do anúncio teste contendo as informações do produto vendido."} />
                            <div>
                              <Row style={{ float:"right", margin:"0", padding:"0" }}>
                                <Col style={{ padding:"2" }}>
                                  <MarketplaceAdsStatus avatar={MercadoLivre} status="success"/>
                                </Col>
                                <Col style={{ padding:"2" }}>
                                  <MarketplaceAdsStatus avatar={Americanas} status="warning"/>
                                </Col>
                              </Row>  
                            </div>
                          </div> */}
                        </Col>
                      );
                    })}
                  </Row>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Icons;
