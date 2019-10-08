import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Google from '../../assets/img/g_google_logo.png';
import Logo from '../../assets/img/logo.png';
import Card from '../../components/Card/Card.jsx';
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import loginService from '../../services/LoginService.jsx';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                emailAddress: '',
                password: ''
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
                this.setValue('password', '');
                console.log(error);
            }
        );
    }

    signInWith() {
        return (
            <div style={{ width: '100%', height: 'auto' }}>
                <div id='gSignInWrapper'>
                    <div id='customBtn' className='customGPlusSignIn'>
                        <span className='icon'></span>
                        <span className='buttonText'>Logar com o Google</span>
                    </div>
                </div>
                <div id='name'></div>
                <a href='/loginGoogle'>
                    <div className='loginGoogle'>
                        <img alt='auto' src={Google} height='5%' width='auto' />
                        <div className='loginTextTitle'>
                            <p style={{ fontSize: '22px', float: 'right' }}>Entrar com Google</p>
                        </div>
                    </div>
                </a>
                <a href='/loginFacebook'>
                    <div className='loginFacebook'>
                    </div>
                </a>
            </div>
        );
    }

    render() {
        return (
            <div className="divLogin">
                <div className="content" style={{ backgroundColor: '#F1F1F1' }}>
                    <Container fluid>
                        <Row>
                            <Col md={7}>
                                <Row>
                                    <div className='login_titles'>
                                        <h2>MARKET HUB</h2>
                                        <h4>CADASTRE SEUS ANÚNCIOS EM DIVERSAS PLATAFORMAS</h4>
                                    </div>
                                </Row>
                                <Row>
                                    <img alt='auto' src={Logo} className='login_logo' />
                                </Row>
                            </Col>
                            <Col>
                                <div className='form_login'>
                                    <Card
                                        plain
                                        title='Acesse sua conta'
                                        content={
                                            <Form className='form_login_input' onSubmit={(e) => {
                                                e.preventDefault(); this.login()
                                            }}>
                                                <FormGroup>
                                                    <Label>Email</Label>
                                                    <Input
                                                        type='text'
                                                        placeholder='Ex: seuemail@email.com'
                                                        required
                                                        onChange={(e) => this.setValue('emailAddress', e.target.value)}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Senha</Label>
                                                    <Input
                                                        type='password'
                                                        placeholder='********'
                                                        required
                                                        onChange={(e) => this.setValue('password', e.target.value)}
                                                    />
                                                </FormGroup>
                                                <div>
                                                    <Link to='/recuperacaoSenha'>
                                                        <p className='text-danger'>
                                                            Esqueceu sua senha?
                                                </p>
                                                    </Link>
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <CustomButtom fill>Entrar</CustomButtom>
                                                    <p style={{ float: 'right' }}>
                                                        Não possui conta? &nbsp;
                                                <Link to='/companyRegistration' style={{ color: '#009688', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '300', lineHeight: 'normal' }}>
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
            </div>
        );
    }
}

export default Login;