import React, { Component } from "react";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService.jsx";
import Iframe from 'react-iframe';
import { Container, Row, Col, 
    Form, FormGroup, Label, 
    Input, FormText, Alert,
    Button, Modal, ModalHeader, 
    ModalBody, ModalFooter, Spinner } from "reactstrap";

class MarketplaceLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.getUrlParams(window.location.href)
        }
    }

    getUrlParams(search) {
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, {[key]: decodeURIComponent(val)})
        }, {})
    }

    render() {
        let modalBody = <Spinner color="primary"/>;
        if(this.state.url.authentication==='true') {
            sessionStorage.setItem("marketplace_authentication", JSON.stringify(
                                                            {
                                                                "status": this.state.url.authentication, 
                                                                "code": this.state.url.code
                                                            }
                                                    ));
            window.parent.location.href = "/#/marketplaces/login";
        } else {
            sessionStorage.removeItem("marketplace_authentication");
            if(this.props.cancelToken===true) {
                sessionStorage.setItem("marketplace_authentication", JSON.stringify(
                    {
                        "status": "true", 
                        "code": "cancelToken"
                    }
                ));
                window.parent.location.href = "/#/marketplaces/login";
            } else {
                modalBody = <Iframe url="https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=3919471605726765"
                            id="marketplaceLogin"
                            width="100%"
                            height="100%"
                            frameBorder="0"  
                        />
            }
        }
        return (
            <div>
                {modalBody} 
            </div>      
        );
    }
} export default MarketplaceLogin;