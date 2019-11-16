import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import MarketplaceLogin from './MarketplaceLogin.jsx';
import Marketplaces from "./Marketplaces.jsx";

class MarketplacesPageRoute extends Component {
    render() {
        return <Marketplaces profile={this.props.profile} />
    }
}

class LoginRoute extends Component {
    render() {
        return <MarketplaceLogin id={this.props.match.params.id} />
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
                <Route path="/marketplaces/login" component={MarketplaceLogin} />
                <Route exact path="/marketplaces/:id/login" component={LoginRoute} />
            </Switch>
        );
    }
}