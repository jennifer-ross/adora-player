import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";

class NewTracksBlock extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const {account} = this.props;

        console.log(account);

        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(NewTracksBlock)));