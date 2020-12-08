import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.sass';
import LoadingFull from "./Components/LoadingFull";

class App extends Component {

    componentDidMount = () => {
    };

    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<LoadingFull/>}>
                    <Switch>
                        <Route exact path="/">
                        </Route>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);