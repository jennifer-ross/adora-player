import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.sass';
import LoadingFull from "./Components/LoadingFull";
import {getUserState} from "./Actions/authActions";
import PrivateRoute from "./Components/PrivateRouter";

const Login = lazy(() => import("./Components/Pages/Login"));
const Home = lazy(() => import("./Components/Pages/Home"));

class App extends Component {

    componentDidMount = () => {
        this.props.getUserState();
    };

    render() {
        const {isAuthenticated} = this.props;

        return (
            <BrowserRouter>
                <Suspense fallback={<LoadingFull/>}>
                    <Switch>
                        <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={Home}/>
                        <Route path="/login">
                            <Login/>
                        </Route>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    getUserState: () => dispatch(getUserState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);