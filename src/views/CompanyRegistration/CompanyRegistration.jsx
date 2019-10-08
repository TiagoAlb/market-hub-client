import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Upload from "../../assets/img/upload.png";
import DefaultAvatar from "../../assets/img/user_avatar.png";
import Card from "../../components/Card/Card.jsx";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import InputFile from "../../components/InputFile/InputFile.jsx";
import UserCard from "../../components/UserCard/UserCard.jsx";
import CompanyService from "../../services/CompanyServices/CompanyService.jsx";

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: DefaultAvatar,
            profile: {
                name: "",
                description: "",
                legalName: "",
                emailAddress: "",
                cnpjCpf: "",
                phoneNumber: "",
                newPassword: ""
            },
            file: new FormData(),
            error: "",
            confirmPassword: "",
            confirmEmailAddress: "",
            success: ""
        };
        this.CompanyService = new CompanyService();
        this._handleImageChange = this._handleImageChange.bind(this);
    }

    setProfileValues(attribute, value) {
        this.setState(
            (estado) => estado.profile[attribute] = value
        );
    }

    setValues(attribute, value) {
        this.setState(
            (estado) => estado[attribute] = value
        );
    }

    changeProfileImage() {
        return (
            <Col md={3}>
                <UserCard
                    avatar={this.state.image}
                    userName={this.state.profile.name}
                    description={
                        <span>
                            {this.state.profile.description}
                        </span>
                    }
                />
                <InputFile
                    buttonStyle="simple"
                    backgroundColor="#E53935"
                    textColor="white"
                    text="Importar Imagem"
                    image={Upload}
                    onChange={(e) => {
                        e.preventDefault();
                        this._handleImageChange(e);
                    }}
                />
                {this.register()}
            </Col>
        );
    }

    createProfile() {
        let profile = this.state.profile;
        this.CompanyService.createProfile(profile,
            (success) => {
                alert("Usuário Cadastrado com Sucesso");
                this.CompanyService.insertImage(success.id, this.state.file,
                    (success) => {
                        console.log("Imagem cadastrada!");
                        this.setValues("success", <Redirect to="/" />);
                    }, (error) => {
                        console.log(error);
                    }
                )
            }, (error) => {
                console.log("Erro!");
                console.log(error);
            }
        )
    }

    register() {
        return (
            <CustomButton simple
                style={{
                    width: '100%', marginTop: '20px', marginBotton: '20px',
                    backgroundColor: '#4C5760', color: 'white'
                }}>
                Cadastrar
            </CustomButton>
        );
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let fileData = e.target.files[0];
        let data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('name', 'profile_avatar');
        data.append('description', 'Image profile');
        this.setValues("file", data);

        if (this.validateImage(fileData)) {
            reader.onloadend = () => {
                this.setValues("image", reader.result);
            };
            reader.readAsDataURL(fileData)
        }
    }

    validateImage(file) {
        if (file) {
            let num = file.name.split(".").length;
            let name = file.name.split(".")[num - 1].toLowerCase();
            if (file.size <= 1048576) {
                if (name === "png" || name === "tiff" || name === "jpg" || name === "jpeg" || name === "bmp") {
                    this.setState({ error: "" });
                    return true;
                } else {
                    this.setState({ error: "Formato inválido! São aceitos apenas arquivos no formato de imagem." });
                    return false;
                }
            } else {
                this.setState({ error: "A imagem não pode ser maior que 1mb." });
                return false;
            }
        } else {
            this.setState({ error: "" });
            return false;
        }
    }

    render() {
        if (this.state.success)
            return this.state.success;
        else
            return (
                <div className="main">
                    <div className="content" style={{ backgroundColor: '#F1F1F1', padding: '5%' }}>
                        <Container fluid>
                            <Form className="form_create" onSubmit={(e) => {
                                e.preventDefault();
                                this.createProfile();
                            }}>
                                <Row>
                                    <Col>
                                        <Card
                                            title="Cadastre sua empresa"
                                            content={
                                                <div>
                                                    <Row>
                                                        <Col>
                                                            <Label style={{ fontWeight: 'bold' }}>DADOS DA CONTA</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={5}>
                                                            <FormGroup>
                                                                <Label>NOME FANTASIA</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.profile.name}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setProfileValues("name", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={7}>
                                                            <FormGroup>
                                                                <Label>DESCRIÇÃO DA EMPRESA</Label>
                                                                <Input
                                                                    type="textarea"
                                                                    value={this.state.profile.description}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setProfileValues("description", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label>EMAIL</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.profile.emailAddress}
                                                                    placeholder="Ex: seuemail@email.com"
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setProfileValues("emailAddress", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label>CONFIRME SEU EMAIL</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.confirmEmailAddress}
                                                                    placeholder="Confirme seu email"
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setValues("confirmEmailAddress", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label>SENHA</Label>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="********"
                                                                    value={this.state.profile.newPassword}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setProfileValues("newPassword", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label>CONFIRME SUA SENHA</Label>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="********"
                                                                    value={this.state.confirmPassword}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setValues("confirmPassword", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Label style={{ fontWeight: 'bold' }}>DADOS DA EMPRESA</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={7}>
                                                            <FormGroup>
                                                                <Label>RAZÃO SOCIAL</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.profile.legalName}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setProfileValues("legalName", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={5}>
                                                            <FormGroup>
                                                                <Label>CNPJ / CPF</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.profile.cnpjCpf}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        this.setProfileValues("cnpjCpf", e.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            }
                                        />
                                    </Col>
                                    {this.changeProfileImage()}
                                </Row>
                            </Form>
                        </Container>
                    </div>
                </div>
            );
    }
}

export default CompanyRegistration;