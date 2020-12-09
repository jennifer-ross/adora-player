import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {withRouter, Redirect} from 'react-router-dom';
import Section from "../Section";
import {connect} from "react-redux";
import {sendUserLogin} from "../../Actions/authActions";
import Form from "../Form";
import Field from "../Field";
import Adora from "./../../Images/Adora.svg";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
        };
    }

    formSubmitHandler = data => {
        const {username} = this.state;
        const {sendUserLogin} = this.props;

        if (username) {
            sendUserLogin({username});
        }
    };

    fieldChangeHandler = data => {
        this.setState({
            [data.name]: data.value,
        });
    };

    render() {
        const {isAuthenticated} = this.props;
        const {username} = this.state;

        if (isAuthenticated) return (<Redirect to='/'/>);

        return (
            <Section className='login-page-section'>
                <div className="welcome-head">
                    <img className='welcome-head__logo' src={Adora}/>
                    <h2 className='welcome-head__h'>
                        <span>Добро пожаловать в Adora</span>
                    </h2>
                </div>
                <Form onSubmit={this.formSubmitHandler}>
                    <Field value={username} onChange={this.fieldChangeHandler} id={'username'} name={'username'} placeholder='Введите логин, email или телефон'/>
                </Form>
            </Section>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    sendUserLogin: (user) => dispatch(sendUserLogin(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(Login)));