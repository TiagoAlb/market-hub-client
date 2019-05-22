import React, { Component } from "react";
import ImageCard from "../../components/ImageCard/ImageCard";
import Logo from "../../assets/img/ml.jpg";
import CustomButton from "../../components/CustomButton/CustomButton";
import Screen from "Useful/Screen.jsx";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService";
import CompanyService from "../../services/CompanyServices/CompanyService.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Iframe from 'react-iframe';
import MarketplacesList from "./MarketplacesList";
import { Container, Row, Col, 
         Form, FormGroup, Label, 
         Input, FormText, Alert,
         Button, Modal, ModalHeader, 
         ModalBody, ModalFooter } from "reactstrap";

class Marketplaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: Screen.getWidth(),
          linkMarketplaceID: "",
          availableMarketplaces: [],
          modal: false
        };
        this.MarketplaceService = new MarketplaceService();
        this.CompanyService = new CompanyService();
        this.availableMarketplacesList();
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        Screen.updateDimensions();
        window.addEventListener("resize", Screen.updateDimensions.bind(this));
    }

    availableMarketplacesList() {
        this.MarketplaceService.read(this.props.profile.id,
            (result) => {
                console.log(result);
                this.setState({availableMarketplaces: result});
                if(result.length > 0)
                    this.setState({linkMarketplaceID: result[0].id});
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    linkMarketplace() {
        this.CompanyService.linkMarketplace(this.props.profile.id, this.state.linkMarketplaceID,
            (success) => {
                console.log(success);
                window.location.reload();
                //this.availableMarketplacesList();
            },(error) => {
                console.log("Erro!");
                console.log(error);
            }
        )
    }

    setValues(attribute, value) {
        this.setState(
            (prop) => prop[attribute] = value
        );
    }

    availableMarketplaces() {
        if(this.state.availableMarketplaces.length > 0) {
            return (
                <div>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="linkMarketplace">Vincular Marketplace</Label>           
                                <Input type="select" name="select" id="linkMarketplace" onChange={(e) => {this.setValues("linkMarketplaceID", e.target.value)}}>
                                    {this.state.availableMarketplaces.map((marketplace) => {
                                        return <option value={marketplace.id}>{marketplace.name}</option>
                                    })}
                                </Input>                      
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <CustomButton fill color="success" onClick={() => {this.linkMarketplace()}}>Vincular</CustomButton>
                        </Col>
                    </Row>
                    <br/>
                </div>
            );
        } else return "";
    }

    render() {
        return (
            <div className="content">
                <Container fluid>
                    {this.availableMarketplaces()}
                    <Row>
                        <Col md={12}>
                            <MarketplacesList 
                                profile_id={this.props.profile.id}
                                toggle={this.toggle}
                                width={this.state.width}
                            />
                        </Col>
                    </Row>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                        <ModalBody>
                            <Iframe url="https://www.mercadolivre.com/jms/mlb/lgz/login?platform_id=ml&go=https%3A%2F%2Fwww.mercadolivre.com.br%2F&loginType=explicit#nav-header"
                                width="100%"
                                id="marketplaceLogin"
                                height="100%"
                                frameBorder="0"
                            />
                        </ModalBody>
                        </Modal>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Marketplaces;