import React, { Component } from "react";
import { Container, Row, Col, Card, CardFooter, CardImg, CardText, CardBody,
    CardTitle, Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap";
import AdsCreateForm from "./AdsCreateForm.jsx";
import ReactDOM from "react-dom";
import "material-design-icons-iconfont";

const ads_categoty = [
    {
        id: "ctg_1",
        name: "Produtos",
        icon: "camera_alt",
        color: ""
    },
    {
        id: "ctg_2",
        name: "Veículos",
        icon: "directions_car",
        color: ""
    },
    {
        id: "ctg_3",
        name: "Imóveis",
        icon: "apartment",
        color: ""
    },
    {
        id: "ctg_4",
        name: "Serviços",
        icon: "room_service",
        color: ""
    }
];


class AdsCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            category_id: ''
        }
        this.nextStep = this.nextStep.bind(this);
    }

    nextStep(id) {
        this.setState({
            step: this.state.step+1,
            category_id: id
        });
    }

    render() {
        console.log(this.state.step);
        if(this.state.step<1) {
            return(
                <div>
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <div>
                                    <h4 style={{ marginTop: "0" }}>O que você deseja publicar?</h4>
                                    <Row>
                                        {ads_categoty.map((prop, key) => {
                                            return (
                                                <Col
                                                md={6}
                                                sm={4}
                                                key={key}
                                                >
                                                    <a className="category_type" onClick={() => this.nextStep(prop.id)}>
                                                        <CategoryType name={prop.name} color={prop.name} icon={prop.icon}/>
                                                    </a>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return(
                <Container fluid>
                    <AdsCreateForm/>
                </Container>
            );
        }
    }
}

class CategoryType extends Component {
    render() {
        return (
            <div>
                <Card style={{ textAlign: "center", cursor: "hand" }}>
                    <CardBody style={{ padding: "0" }}>
                        <CardText>
                            <i class="material-icons" style={{ padding: "20 0 0 0", fontSize: "48" }} color={this.props.color}>{this.props.icon}</i>
                        </CardText>
                        <CardFooter>{this.props.name}</CardFooter>
                    </CardBody>
                </Card>
           </div>
        );
    }
}

class Questions extends Component {
    render() {
        return (
            <div>
                Aqui
           </div>
        );
    }
}

export default AdsCreate;