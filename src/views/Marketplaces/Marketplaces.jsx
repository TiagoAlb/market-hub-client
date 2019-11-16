import React, { Component } from "react";
import { Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import CompanyService from "../../services/CompanyServices/CompanyService.jsx";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService.jsx";
import Screen from "../../Useful/Screen.jsx";
import MarketplacesList from "./MarketplacesList.jsx";

class Marketplaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Screen.getWidth(),
            linkMarketplaceID: "",
            availableMarketplaces: [],
            modal: false,
            idLogin: 0,
            popUpLogin: ""
        };
        this.MarketplaceService = new MarketplaceService();
        this.CompanyService = new CompanyService();
        this.availableMarketplacesList();
        this.toggle = this.toggle.bind(this);
    }

    UNSAFE_componentWillMount() {
        Screen.updateDimensions();
        window.addEventListener("resize", Screen.updateDimensions.bind(this));
    }

    availableMarketplacesList() {
        this.MarketplaceService.read(this.props.profile.id,
            (result) => {
                console.log(result);
                this.setState({ availableMarketplaces: result });
                if (result.length > 0)
                    this.setState({ linkMarketplaceID: result[0].id });
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    toggle(id) {
        sessionStorage.removeItem("marketplace_authentication");
        sessionStorage.setItem("marketplace_authentication", JSON.stringify(
            {
                "id": id,
                "profile_id": this.props.profile.id
            }
        ));
        this.openPopUp('https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=3919471605726765', 'marketplace_login', 548, 625);
    }

    openPopUp(myURL, title, myWidth, myHeight) {
        let newWidthScreen = window.innerWidth + (window.screenLeft * 2);
        let newHeightScreen = window.innerHeight + (window.screenTop * 2);

        let left = (newWidthScreen - myWidth) / 2;
        let top = (newHeightScreen - myHeight) / 4;
        window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
    }

    linkMarketplace() {
        window.location.href = "/#/marketplaces/link";
        this.CompanyService.linkMarketplace(this.props.profile.id, this.state.linkMarketplaceID,
            (success) => {
                console.log(success);
                window.location.href = "/#/marketplaces";
                //this.availableMarketplacesList();
            }, (error) => {
                console.log("Erro!");
                console.log(error);
            }
        )
    }

    updateAuthorization(code) {
        this.MarketplaceService.updateAuthorization(this.props.profile.id, this.state.idLogin, code,
            (success) => {
                console.log(success);
            }, (error) => {
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
        if (this.state.availableMarketplaces.length > 0) {
            return (
                <div>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="linkMarketplace">Vincular Marketplace</Label>
                                <Input type="select" name="select" id="linkMarketplace" onChange={(e) => { this.setValues("linkMarketplaceID", e.target.value) }}>
                                    {this.state.availableMarketplaces.map((marketplace, key) => {
                                        return <option key={key} value={marketplace.id}>{marketplace.name}</option>
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <CustomButton fill color="success" onClick={() => { this.linkMarketplace() }}>Vincular</CustomButton>
                        </Col>
                    </Row>
                    <br />
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
                </Container>
            </div>
        );
    }
}

export default Marketplaces;