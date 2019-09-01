import React, { Component } from 'react';
import Route from "react-router-dom/es/Route";
import app from "../../routes/app.jsx";
import loginService from "../../services/LoginService.jsx";


class LoadingPage extends Component {
    constructor(props) {
        super(props);
        this.loading();
        this.state = {
            concluded: ""
        };
    }

    loading() {
        loginService.validateLogin(() => {
            this.setState({
                concluded: <Route path="/" name="Home" component={app}/>
            });
        });
    }

    render() {
        if (this.state.concluded) {
            return this.state.concluded;
        } else return (
            <div/>
        );
    }
}

export default LoadingPage;