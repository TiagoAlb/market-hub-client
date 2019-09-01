import "material-design-icons-iconfont";
import React, { Component } from "react";
import {
    Card, CardBody, CardFooter, CardText, Col, Container, ModalFooter, InputGroupText,
    Form, FormGroup, FormText, Input, Label, Row, InputGroup, InputGroupAddon
} from "reactstrap";

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

class AdsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ads: this.props.ads
        }
    }
    render() {
        switch(this.props.step) {
            case 0:
                return <Step1 onSelectCategory={this.props.onSelectCategory}/>
            case 1:
                return <Step2 setAdsValues={this.props.setAdsValues} ads={this.state.ads} category_list={this.props.category_list}/>
        }
    }
}

class Step1 extends Component {
    handleStepCategory = (categoryId) => {
        this.props.onSelectCategory(categoryId);
    }

    render() {
        return (
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
                                <a className="category_type" onClick={() => this.handleStepCategory(prop.id)}>
                                    <Card style={{ textAlign: "center", cursor: "hand" }}>
                                        <CardBody style={{ padding: "0" }}>
                                            <CardText>
                                                <i class="material-icons" style={{ padding: "20 0 0 0", fontSize: "48" }} color={prop.name}>{prop.icon}</i>
                                            </CardText>
                                            <CardFooter>{prop.name}</CardFooter>
                                        </CardBody>
                                    </Card>
                                </a>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

class Step2 extends Component {
    changeAdsValues = (attribute, value) => {
        this.props.setAdsValues(attribute, value);
    }

    category_options() {
        if(this.props.category_list.length > 0) {
            return (
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                    {this.props.category_list.map((prop) => {
                        return <option value={prop.id}>{prop.name}</option>                 
                    })}
                </Input>
            );
        } else {
            return ""
        }
    }

    category_options_selected() {
        if(this.props.category_list.length > 0) {
            return (
                <div style={{ fontSize: "14px" }}>
                    <span style={{ color: "#0099CC" }}>Inicio</span>
                    <span>{" > "}</span>
                    {this.props.category_list.map((prop, index) => {
                        return (
                            <span>
                                <span style={{ color: "#0099CC" }}>{prop.name}</span>
                                {(index!==this.props.category_list.length-1) ?
                                    <span>
                                        {" > "}
                                    </span>
                                :
                                    ""
                                }
                            </span>   
                        );           
                    })}
                </div>
            );
        } else {
            return ""
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="title">Digite o título de seu anúncio</Label>
                    <FormText color="muted">
                        Para melhor identificação, inicie com o nome, marca e modelo de seu produto.
                    </FormText>
                    <Input type="text" name="title" id="title" value={this.props.ads.title} 
                        placeholder="Ex: Câmera Fotográfica Nikon D3200" 
                        onChange={(e) => {
                            e.preventDefault();
                            this.changeAdsValues("title", e.target.value);
                        }}
                    />
                </FormGroup>
                {this.props.ads.title!==null && this.props.ads.title!="" ?
                    <FormGroup>
                        <Label for="category_id">Selecione a categoria de seu produto</Label>
                        <FormText color="muted">
                            Escolha entre as opções as categorias que mais definem o que você deseja anunciar.
                        </FormText>
                        {this.category_options_selected()}
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i class="material-icons">search</i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Pesquisar Categoria"/>
                        </InputGroup>
                        {this.category_options()}
                    </FormGroup>
                :
                    ""
                }
            </Form>
        );
    }
}

export default AdsForm;