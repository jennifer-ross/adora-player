import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {withRouter, Route, Switch} from "react-router-dom";
import Player from "../Player";
import {getUserInfo} from "../../Actions/userActions";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {user} = this.props;

        if (!user) {
            this.props.getUserInfo();
        }
    }

    render() {
        const {user} = this.props;

        return (
            <>
                <Switch>
                    <Route path='/' exact={true}>
                        <div>
                            Home
                        </div>
                    </Route>
                </Switch>
                <Player src={'/'} />
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    getUserInfo: () => dispatch(getUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(Home)));