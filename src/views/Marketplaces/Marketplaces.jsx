import React, { Component } from "react";
import ImageCard from "../../components/ImageCard/ImageCard";
import Logo from "../../assets/img/ml.jpg";
import CustomButton from "../../components/CustomButton/CustomButton";
import Screen from "Useful/Screen.jsx";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService";
import CompanyService from "../../services/CompanyServices/CompanyService.jsx";
import { Container, Row, Col, 
         Form, FormGroup, Label, 
         Input, FormText, Alert } from "reactstrap";

class Marketplaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: Screen.getWidth(),
          linkMarketplaceID: "",
          availableMarketplaces: [],
          companyMarketplaces: {}
        };
        this.MarketplaceService = new MarketplaceService();
        this.CompanyService = new CompanyService();
        this.availableMarketplacesList();
        this.companyMarketplacesList();
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

    companyMarketplacesList() {
        this.CompanyService.readMarketplaces(this.props.profile.id, 0,
            (result) => {
                console.log(result);
                this.setState({companyMarketplaces: result});
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    linkMarketplace() {
        this.CompanyService.linkMarketplace(this.props.profile.id, this.state.linkMarketplaceID,
            (success) => {
                console.log(success);
                this.availableMarketplacesList();
                this.companyMarketplacesList();
            },(error) => {
                console.log("Erro!");
                console.log(error);
            }
        )
    }

    setValues(attribute, value) {
        this.setState(
            (estado) => estado[attribute] = value
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

    companyMarketplaces() {
        if(this.state.companyMarketplaces.content) {
            return (
                <div>
                    {this.state.companyMarketplaces.content.map((marketplace) => {
                        return <ImageCard
                            avatar={Logo}
                            content={
                            <h3>{marketplace.name}</h3>
                            }   
                            options={
                            <a href="/marketplaceLogin" style={{ color: 'RED', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '300', lineHeight: 'normal' }}>
                                CONECTAR</a>
                            }
                            width={this.state.width}
                        />
                    })}
                </div>
            );
        } else return <Alert color="info">Não existem marketplaces vinculados!</Alert>;
    }

    render() {
        return (
            <div className="content">
                <Container fluid>
                    {this.availableMarketplaces()}
                    <Row>
                        <Col md={12}>
                            {this.companyMarketplaces()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Marketplaces;
