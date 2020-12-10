import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";

class Profile extends Component {
    render() {
        const {account} = this.props;

        return (
            <div className="profile">
                <div className="profile__image">
                    <img src={`https://avatars.mds.yandex.net/get-yapic/${account.avatarHash}/islands-200`}/>
                </div>
                <div className="profile__name">
                    {account.firstName}
                </div>
                <div className="profile__login">
                    {account.login}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
});

export default connect(mapStateToProps, null)(withTranslation()(withRouter(Profile)));