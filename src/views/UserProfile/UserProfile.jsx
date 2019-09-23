import React, { Component } from "react";
import { ControlLabel, FormControl, FormGroup, Form } from "react-bootstrap";
import { Col, Container, Input, Label, Row } from 'reactstrap';
import Upload from "../../assets/img/upload.png";
import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import InputFile from "../../components/InputFile/InputFile.jsx";
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import loginService from "../../services/LoginService.jsx";

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: `/api/profiles/` + this.props.profile.id + `/image?` + loginService.getAuthorizationGet(),
      profile: this.props.profile
    };
  }

  setProfileValues(attribute, value) {
    this.setState(
      (estado) => estado.profile[attribute] = value
    );
  }

  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Editar Cadastro"
                content={
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>CNPJ / CPF</Label>
                          <Input
                            type="text"
                            value={this.state.profile.cnpjCpf}
                            disabled
                            onChange={(e) => {
                              e.preventDefault();
                              this.setProfileValues("name", e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Nome Fantasia</Label>
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
                    </Row>
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Razão Social",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Razão Social",
                          defaultValue: this.state.profile.legalName
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Email",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.props.profile.emailAddress,
                        },
                        {
                          label: "Senha",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "**********",
                        }
                      ]}
                    />
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Descrição da Empresa</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Descrição da Empresa"
                            defaultValue={this.state.profile.description}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" color="success" pullRight fill type="submit">
                      Alterar
                    </Button>
                    <div className="clearfix" />
                  </Form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={this.state.avatar}
                name={this.state.profile.name}
                userName={this.state.profile.emailAddress}
                description={
                  <span>
                    {this.state.profile.description}
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserProfile;
