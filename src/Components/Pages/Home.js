import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";

class Home extends Component {
    render() {
        const {} = this.props;

        return (
            <div>
                Home
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    token: state.user.token,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(Home)));