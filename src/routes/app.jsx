import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import notLoggedRoutes from './notLoggedRoutes.jsx';
import loggedRoutes from './loggedRoutes.jsx';
import Header from '../components/Header/Header.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Login from '../views/Login/Login.jsx';
import loginService from '../services/LoginService.jsx';


class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: true//loginService.logged()
        };
    }

    render() {
        if(!this.state.logged) {
            return (
            <Switch> {
                notLoggedRoutes.map((prop, key) => {
                    if(prop.name === 'UserRegister') {
                        return (
                            <Route
                                path={prop.path}
                                key={key}
                                render={(props) => <prop.component  {...props}/>}
                            />
                        );
                    }

                    return (
                        <Route path={prop.path} component={prop.component} key={key}
                               render={() => <Login onLogin={() => this.setState({logged: true})}/>}
                        />
                    );
                })
            }
            </Switch>
            );
        } else {
            return (
                <div className="wrapper">
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props}/>
                        <Switch> {
                            loggedRoutes.map((prop, key) => {
                                if (prop.name === "Notifications")
                                return (
                                    <Route
                                        path={prop.path}
                                        key={key}
                                        render={routeProps =>
                                            <prop.component
                                                {...routeProps}
                                                handleClick={this.handleNotificationClick}
                                            />}
                                    />
                                );
                                if (prop.name === "Profile")
                                    return (
                                        <Route
                                            path={prop.path}
                                            key={key}
                                            render={(props) => <prop.component  {...props}
                                                profile={loginService.logged()}/>}
                                            profile={loginService.logged()}
                                        />
                                    );
                                if (prop.name === "Marketplaces")
                                    return (
                                        <Route
                                            path={prop.path}
                                            key={key}
                                            render={(props) => <prop.component  {...props}
                                                                                profile={loginService.logged()}/>}
                                            profile={loginService.logged()}
                                            />
                                        );
                                    if (prop.name === "Anúncios")
                                        return (
                                            <Route
                                                path={prop.path}
                                                key={key}
                                                render={(props) => <prop.component  {...props}
                                                                                    profile={loginService.logged()}/>}
                                                profile={loginService.logged()}
                                                />
                                            );
                                    if (prop.redirect)
                                        return (
                                            <Redirect from={prop.path} to={prop.to} key={key}/>
                                        );
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key}/>
                                        );
                            })
                        }
                        </Switch>
                    </div>
                </div>
            );
        }
    }
}

export default app;
