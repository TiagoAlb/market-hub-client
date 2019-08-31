import React, { Component } from "react";
import CustomButtom from "../../components/CustomButton/CustomButton.jsx";
import Card from "../../components/Card/Card.jsx";
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import Google from '../../assets/img/g_google_logo.png';
import loginService from '../../services/LoginService.jsx'
import {
    Container, Col, Row, Form,
    FormGroup, Label, Input
} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                emailAddress: "",
                password: ""
            }
        };
    }

    setValue(attribute, value) {
        this.setState(
            (state) => state.login[attribute] = value
        );
    }

    login() {
        loginService.login(
            this.state.login.emailAddress,
            this.state.login.password,
            (sucess) => {
                this.props.onLogin();
            },
            (error) => {
                this.setValue("password", "");
                console.log(error);
            }
        );
    }

    signInWith() {
        return (
            <div style={{ width: '100%', height: 'auto' }}>
                <div id="gSignInWrapper">
                    <div id="customBtn" class="customGPlusSignIn">
                        <span class="icon"></span>
                        <span class="buttonText">Logar com o Google</span>
                    </div>
                </div>                 
                <div id="name"></div>
                <a href="/loginGoogle">
                    <div className="loginGoogle">
                        <img src={Google} height="5%" width="auto"/>
                        <div className="loginTextTitle">
                            <p style={{ fontSize: '22px', float: 'right' }}>Entrar com Google</p>
                        </div>
                    </div>
                </a>
                <a href="/loginFacebook">
                    <div className="loginFacebook">
                    </div>
                </a>
            </div>
        );
    }

    render() {
        return (
            <div className="divLogin">
                <Container fluid>
                    <Row>  
                        <Col>
                            <Row>
                                <div className="login_titles">
                                    <h2>MARKET HUB</h2>
                                    <h4>CADASTRE SEUS ANÚNCIOS EM DIVERSAS PLATAFORMAS</h4>
                                </div>
                            </Row>
                            <Row>
                                <img src={Logo} className="login_logo"/>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <div className="form_login">
                                <Card 
                                plain
                                title="Acesse sua conta"
                                content={
                                    <Form className="form_login_input" onSubmit={(e) => {
                                        e.preventDefault();this.login()}}>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input
                                                type="text"
                                                placeholder="Ex: seuemail@email.com"
                                                required
                                                onChange={(e) => this.setValue("emailAddress", e.target.value)}
                                             />
                                                </FormGroup>
                           
                                                <FormGroup>
                                                    <Label>Senha</Label>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        required
                                                        onChange={(e) => this.setValue("password", e.target.value)}
                                                    />
                                                </FormGroup>
                                       <div>
                                            <Link to = "/recuperacaoSenha">
                                            <p class="text-danger">       
                                                Esqueceu sua senha?
                                                </p>
                                                </Link>
                                        </div>       
                                        <div style={{ width: '100%' }}> 
                                            <CustomButtom fill className="pattern_button">Entrar</CustomButtom>
                                            <p style={{ float: 'right' }}> 
                                                Não possui conta? &nbsp;
                                                <Link to = "/companyRegistration" style={{ color: '#009688', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '300', lineHeight: 'normal' }}>
                                                Cadastre-se</Link>
                                            </p>
                                        </div>
                                    </Form>    
                                }
                            />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;