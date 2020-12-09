import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    validateEmail,
    validateInternationalPhone,
    validateNumber,
    validatePassword,
    validateString
} from "../Helpers/validator";

class Field extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || '',
            err: '',
            valid: false,
            locked: this.props.locked || false,
        };
    }

    componentDidMount() {
        const {value} = this.state;

        this.setValue(value);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let isChange = false;
        const {value, locked} = this.props;

        if (prevProps.value !== value) {
            isChange = true;
        }

        if (prevProps.locked !== locked) {
            isChange = true;
        }

        if (isChange) {
            this.setState({value, locked});
            this.setValue(value);
        }
    }

    changeHandler = e => {
        const {target} = e;
        const value = target.value;

        this.setValue(value);
    };

    setValue = value => {
        const {locked} = this.state;
        const {onChange, name} = this.props;

        const {err, valid} = this.validateField(value);

        if (!locked) {
            this.setState({
                value,
                err,
                valid
            });
            if (valid || !value) {
                onChange({name: name, value});
            }
        }
    };

    validateField = value => {
        const {type} = this.props;
        let validator = {valid: true, err: ''};

        switch (type) {
        case 'text': {
            validator = validateString(value);
            break;
        }
        case 'search': {
            validator = validateString(value);
            break;
        }
        case 'password': {
            validator = validatePassword(value);
            break;
        }
        case 'email': {
            validator = validateEmail(value);
            break;
        }
        case 'tel': {
            validator = validateInternationalPhone(value);
            break;
        }
        case 'number': {
            validator = validateNumber(value);
            break;
        }
        }

        return validator;
    };

    render() {
        const {id, label, name, className, placeholder, icon, type, btn} = this.props;
        const {value, err, valid, locked} = this.state;

        return (
            <div className={classNames(className, 'input filed', valid !== true ? 'no-valid' : '', err ? 'has-error' : '', type === 'search' ? 'search' : '')} style={type === 'hidden' ? {display: 'none'} : {}}>
                {
                    label ? <label htmlFor={id}>{icon || null}{label}</label> : null
                }
                <div className='input__container'>
                    <input className={classNames(`${type}__input`, 'input__input')} readOnly={locked} type={type} name={name} placeholder={placeholder} onChange={this.changeHandler} value={value}/>
                    {btn || null}
                </div>
                {
                    err && type !== 'search' ? <p className='input__error'>{err}</p> : null
                }
            </div>
        );
    }
}

Field.defaultProps = {
    type: 'text',
};

Field.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'number', 'tel', 'password', 'search']),
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    placeholder: PropTypes.string,
    icon: PropTypes.element,
    btn: PropTypes.element,
    id: PropTypes.string.isRequired,
    locked: PropTypes.bool,
};

export default Field;
