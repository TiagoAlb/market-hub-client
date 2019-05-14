import React, { Component } from "react";
import ImageCard from "../../components/ImageCard/ImageCard";
import Logo from "../../assets/img/ml.jpg";
import CustomButton from "../../components/CustomButton/CustomButton";
import Screen from "Useful/Screen.jsx";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService";
import CompanyService from "../../services/CompanyServices/CompanyService.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Iframe from 'react-iframe';
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
          companyMarketplaces: {},
          modal: false, 
          hasMore: false,
          nextPage: 0
        };
        this.MarketplaceService = new MarketplaceService();
        this.CompanyService = new CompanyService();
        this.availableMarketplacesList();
        this.companyMarketplacesList();
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

    companyMarketplacesList() {
        console.log(this.state.nextPage);
        this.CompanyService.readMarketplaces(this.props.profile.id, this.state.nextPage,
            (result) => {
                if(this.state.companyMarketplaces.totalElements > 0) {
                    let newArray = this.state.companyMarketplaces;
                    newArray.numberOfElements = newArray.numberOfElements + result.numberOfElements;
                    newArray.content.concat(result.content);
                    this.setState({companyMarketplaces: newArray});
                } else {
                    this.setState({companyMarketplaces: result});
                }
                if(result.totalPages-1>this.state.nextPage) {
                    this.setState({nextPage: this.state.nextPage+1, hasMore: false});
                }
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
                this.setState({companyMarketplaces: {}, nextPage: 0, hasMore: false});
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
        console.log("AQUI RESULTADOS: ");
        console.log("MARKETPLACES: ");
        console.log(this.state.companyMarketplaces);
        console.log("PAGINA: ");
        console.log(this.state.nextPage);
        if(this.state.companyMarketplaces.totalElements > 0) {
            return (
                <div>
                     <InfiniteScroll
                        dataLength={this.state.companyMarketplaces.totalElements}
                        next={this.companyMarketplacesList}
                        hasMore={this.state.hasMore}
                        loader={<h4>Carregando...</h4>}
                    >
                    {this.state.companyMarketplaces.content.map((marketplace) => {
                        return <ImageCard
                            avatar={Logo}
                            content={
                            <h3>{marketplace.name}</h3>
                            }   
                            options={
                            <Button color="danger" onClick={this.toggle}>
                                CONECTAR
                            </Button>
                            }
                            width={this.state.width}
                        />
                    })}
                    </InfiniteScroll>
                </div>
            );
        } else {
            return <Alert color="info">Não existem marketplaces vinculados!</Alert>
        }
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
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                        </Modal>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Marketplaces;
