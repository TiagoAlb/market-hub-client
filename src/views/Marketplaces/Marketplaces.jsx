import React, { Component } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import Screen from "Useful/Screen.jsx";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService";
import CompanyService from "../../services/CompanyServices/CompanyService.jsx";
import MarketplaceLogin from './MarketplaceLogin';
import MarketplacesList from "./MarketplacesList";
import { Container, Row, Col, FormGroup, Label, 
         Input, Modal, ModalHeader, ModalBody } from "reactstrap";

const modal_header_style = {
    backgroundColor: "transparent", 
    outline: "none", 
    zIndex: "2", 
    position: "absolute", 
    width: "100%", 
    border: "0"
}

const modal_body_style = {
    padding: "0", 
    zIndex: "1", 
    width: "100%", 
    height: "100%"
}

class Marketplaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: Screen.getWidth(),
          linkMarketplaceID: "",
          availableMarketplaces: [],
          modal: false, 
          idLogin: 0,
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

    toggle(id) {
        this.setState(prevState => ({
            idLogin: id,
            modal: !prevState.modal
        }));
    }

    linkMarketplace() {
        window.location.href = "/#/marketplaces/link";
        this.CompanyService.linkMarketplace(this.props.profile.id, this.state.linkMarketplaceID,
            (success) => {
                console.log(success);
                window.location.href="/#/marketplaces";
                //this.availableMarketplacesList();
            },(error) => {
                console.log("Erro!");
                console.log(error);
            }
        )
    }

    updateAuthorization(code) {
        this.MarketplaceService.updateAuthorization(this.props.profile.id, this.state.idLogin, code,
            (success) => {
                console.log(success);
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
        let mp_auth = sessionStorage.getItem("marketplace_authentication");
        if(this.state.modal!==false && mp_auth!==null && JSON.parse(mp_auth).status==='true') {
            this.updateAuthorization(JSON.parse(mp_auth).code);
            sessionStorage.removeItem("marketplace_authentication");
            mp_auth = "";
            this.toggle(0);
            window.location.href="/#/marketplaces";
        }

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
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle} style={modal_header_style}/>
                        <ModalBody style={modal_body_style}>
                            <MarketplaceLogin idLogin={this.state.idLogin} cancelToken={false}/>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        );
    }
}

export default Marketplaces;