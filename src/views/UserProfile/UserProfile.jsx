import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import InputFile from "../../components/InputFile/InputFile";
import Upload from "../../assets/img/upload.png";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import loginService from "../../services/LoginService";
import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        avatar: `/api/profiles/` + this.props.profile.id + `/image?` + loginService.getAuthorizationGet(),
        profile: this.props.profile
    };
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Editar Cadastro"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "CNPJ / CPF",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "CNPJ / CPF",
                          defaultValue: this.props.profile.cnpjCpf,
                          disabled: true
                        },
                        {
                          label: "Nome Fantasia",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nome Fantasia",
                          defaultValue: this.props.profile.name
                        }
                      ]}
                    />
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
                  </form>
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
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
