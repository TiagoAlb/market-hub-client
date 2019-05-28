import React, { Component } from "react";
import {Route, Switch} from 'react-router-dom';
import MarketplaceLogin from './MarketplaceLogin';
import Marketplaces from "./Marketplaces";

class MarketplacesPageRoute extends Component {
    render() {
        return <Marketplaces profile={this.props.profile}/>
    }
}

class LoginRoute extends Component {
    render() {
        return <MarketplaceLogin profile={this.props.profile}/>
    }
}
export default class MarketplacesRoute extends Component {
    render() {
        return (
            <Switch>
                <Route
                    exact path="/marketplaces"
                    render={(props) =>
                        <MarketplacesPageRoute
                            {...props}
                            profile={this.props.profile}
                        />}
                />
                <Route
                    exact path="/marketplaces/login"
                    render={(props) =>
                        <MarketplacesPageRoute
                            {...props}
                            profile={this.props.profile}
                        />}
                />
                <Route
                    path="/marketplaces/:id/login"
                    render={(props) =>
                        <LoginRoute
                            {...props}
                            profile={this.props.profile}
                        />}
                />
            </Switch>
        );
    }
}